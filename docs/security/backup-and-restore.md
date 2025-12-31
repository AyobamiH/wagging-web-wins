# Backup & Disaster Recovery Plan

## Overview

This document outlines backup procedures, restoration processes, and disaster recovery protocols for Tail Wagging Websites production infrastructure.

**Last Updated**: 2025-01-14  
**Next Review**: 2025-04-14  
**Owner**: DevOps/Infrastructure Team

---

## Backup Strategy

### What We Back Up

1. **Supabase Database** (PostgreSQL)
   - All tables: posts, messages, customers, payments, subscriptions, user_roles, audit_log
   - Database functions and triggers
   - Row Level Security policies
   - Stored procedures

2. **Supabase Storage** (Blog images)
   - blog bucket contents
   - OG images for blog posts

3. **Application Configuration**
   - Environment variables (encrypted)
   - Supabase Edge Function code (versioned in git)
   - Frontend code (versioned in git)

### Backup Schedule

| Resource | Frequency | Retention | Method |
|----------|-----------|-----------|--------|
| **Database** | Daily (3 AM UTC) | 30 days | Supabase automatic backups |
| **Database (manual)** | Before migrations | 90 days | Manual export via Supabase Dashboard |
| **Storage buckets** | Weekly (Sundays) | 30 days | Supabase Storage snapshots |
| **Git repositories** | Every commit | Indefinite | GitHub |
| **Secrets** | Monthly (encrypted) | 90 days | 1Password/Vault (external) |

### Automated Backups (Supabase)

Supabase provides automatic daily backups:

- **Location**: Supabase's secure backup infrastructure
- **Access**: Supabase Dashboard → Settings → Database → Backups
- **Point-in-Time Recovery**: Available for Pro/Enterprise plans
- **Cross-Region**: Backups stored in separate geographic region

**Note**: Free tier has limited backup retention. For production, ensure you're on Pro plan or higher.

### Manual Backup Procedures

#### Database Backup (Before Critical Changes)

```bash
# 1. Navigate to Supabase Dashboard
# 2. Go to Settings → Database → Connection String
# 3. Use pg_dump to create backup

# Export full database
pg_dump -U postgres -h db.viwxxjnehceedyctevau.supabase.co \
  -d postgres -F c -b -v \
  -f "backup-$(date +%Y%m%d-%H%M%S).dump"

# Export specific tables only (lightweight)
pg_dump -U postgres -h db.viwxxjnehceedyctevau.supabase.co \
  -d postgres -F c -b -v \
  -t public.posts -t public.customers -t public.payments \
  -f "backup-critical-tables-$(date +%Y%m%d-%H%M%S).dump"
```

**Storage Location**: Store dumps in:
- Local encrypted drive: `/backups/supabase/`
- Cloud backup: AWS S3 / Google Cloud Storage (encrypted bucket)
- Team shared drive (encrypted, access-controlled)

#### Storage Bucket Backup

```bash
# Install Supabase CLI
npm install -g supabase

# Link to project
supabase link --project-ref viwxxjnehceedyctevau

# Download all files from blog bucket
supabase storage download --bucket blog --local-path ./backups/blog-$(date +%Y%m%d)
```

---

## Restoration Procedures

### Database Restoration

#### Full Database Restore (Disaster Recovery)

```bash
# 1. Stop all services writing to database
# 2. Restore from dump file

pg_restore -U postgres -h db.viwxxjnehceedyctevau.supabase.co \
  -d postgres -c -v \
  backup-20250114-030000.dump

# 3. Verify data integrity
psql -U postgres -h db.viwxxjnehceedyctevau.supabase.co -d postgres -c "SELECT count(*) FROM posts;"
psql -U postgres -h db.viwxxjnehceedyctevau.supabase.co -d postgres -c "SELECT count(*) FROM customers;"

# 4. Test critical flows (login, payment, blog rendering)
# 5. Re-enable services
```

#### Point-in-Time Recovery (Supabase Pro/Enterprise)

If using Supabase PITR:

1. Navigate to Dashboard → Settings → Database → Backups
2. Select "Point-in-Time Recovery"
3. Choose timestamp to restore to
4. Create new project from backup OR restore in place
5. Update connection strings if new project created
6. Verify data and test functionality

#### Selective Table Restore (Rollback Mistake)

```bash
# Restore only specific tables without affecting others
pg_restore -U postgres -h db.viwxxjnehceedyctevau.supabase.co \
  -d postgres -c -v \
  -t public.posts \
  backup-20250114-030000.dump

# If you need to keep current data and merge:
# 1. Restore to temporary table
pg_restore -U postgres -h db.viwxxjnehceedyctevau.supabase.co \
  -d postgres -v \
  -t public.posts \
  backup-20250114-030000.dump | sed 's/public.posts/public.posts_restore/' | psql

# 2. Manually verify and merge data
# 3. Drop temporary table when done
```

### Storage Bucket Restoration

```bash
# Upload files back to Supabase Storage
supabase storage upload --bucket blog --local-path ./backups/blog-20250114 --remote-path /
```

### Application Code Restoration

If application code is corrupted or compromised:

```bash
# Revert to last known good commit
git revert HEAD~3  # or specific commit hash

# Or restore from tagged release
git checkout v1.2.3

# Rebuild and redeploy
npm install
npm run build
# Follow deployment procedure
```

---

## Disaster Recovery Scenarios

### Scenario 1: Database Corruption

**Symptoms**: Query errors, missing data, constraint violations

**Recovery Steps**:
1. Identify scope of corruption (which tables/records)
2. Stop all write operations immediately
3. Create snapshot of current state (even if corrupted)
4. Restore from most recent pre-corruption backup
5. Replay transactions from audit_log if possible
6. Verify data integrity with checksums
7. Resume operations

**RTO** (Recovery Time Objective): 2 hours  
**RPO** (Recovery Point Objective): 24 hours (daily backup)

### Scenario 2: Accidental Data Deletion

**Symptoms**: Admin accidentally deleted blog posts, customer records

**Recovery Steps**:
1. Check audit_log to identify what was deleted and when
2. If deletion was recent (< 1 hour), restore from PITR
3. If older, restore specific tables from daily backup
4. Verify restored data matches expectations
5. Update audit_log with restoration event

**RTO**: 30 minutes  
**RPO**: 24 hours

### Scenario 3: Ransomware/Security Breach

**Symptoms**: Encrypted database, suspicious admin activity, data exfiltration

**Recovery Steps**:
1. **DO NOT PAY RANSOM**
2. Immediately revoke all API keys, secrets, and credentials
3. Isolate compromised systems (block network access)
4. Notify stakeholders and customers (GDPR requirement if PII exposed)
5. Restore from last known clean backup (before breach)
6. Conduct forensic analysis (preserve evidence)
7. Patch vulnerabilities before bringing system back online
8. Reset all user passwords
9. Review and harden security policies

**RTO**: 4-8 hours  
**RPO**: Up to 24 hours (acceptable loss given severity)

### Scenario 4: Supabase Service Outage

**Symptoms**: Cannot connect to database, edge functions timing out

**Recovery Steps**:
1. Check Supabase status page: https://status.supabase.com
2. If widespread outage, wait for Supabase team to restore
3. If isolated to our project:
   - Check for billing issues (suspended account)
   - Verify network connectivity
   - Contact Supabase support
4. Consider migrating to backup Supabase project (requires PITR snapshot)

**RTO**: Dependent on Supabase (typically 30 min - 2 hours)

---

## Testing & Validation

### Quarterly Restore Tests

**Schedule**: Every 3 months (March, June, September, December)

**Test Procedure**:
1. Create test Supabase project
2. Restore latest backup to test project
3. Verify all tables have correct row counts
4. Test critical queries (auth, payments, blog posts)
5. Check RLS policies are intact
6. Validate audit_log integrity
7. Document any issues found
8. Update restore procedures if needed

**Checklist**:
- [ ] Backup file accessible and not corrupted
- [ ] Restore completes without errors
- [ ] Row counts match production
- [ ] Sample queries return expected results
- [ ] RLS policies functioning correctly
- [ ] Trigger functions working
- [ ] Audit_log shows historical data
- [ ] Secrets/environment variables documented

### Annual Disaster Recovery Drill

**Schedule**: Once per year (January)

**Drill Scenario**: Simulate complete infrastructure failure

1. Set up new Supabase project from scratch
2. Restore full database from backup
3. Restore storage buckets
4. Deploy application code
5. Configure DNS to point to new infrastructure
6. Test all critical flows end-to-end
7. Measure actual RTO vs target

**Success Criteria**:
- Application fully operational within 4 hours
- No data loss beyond 24 hours
- All payment flows functional
- All auth flows functional
- Admin panel accessible

---

## Backup Checklist (Before Major Changes)

Use this checklist before:
- Database migrations
- RLS policy changes
- Supabase plan upgrades/downgrades
- Major application releases

**Pre-Change Checklist**:
- [ ] Create manual database backup
- [ ] Export current RLS policies (`pg_dump --schema-only`)
- [ ] Export edge function code (already in git, verify)
- [ ] Export environment variables list (not values)
- [ ] Tag current git commit
- [ ] Document what's changing and why
- [ ] Identify rollback plan
- [ ] Schedule during low-traffic window
- [ ] Notify team of maintenance window

**Post-Change Verification**:
- [ ] All tables accessible
- [ ] RLS policies working correctly
- [ ] Edge functions deployed successfully
- [ ] Critical flows tested (auth, payment, blog)
- [ ] No errors in Supabase logs
- [ ] Monitoring shows normal metrics

---

## Contact Information

**Backup Responsibilities**:
- **Daily Automated**: Supabase (automatic)
- **Manual Pre-Migration**: Lead Developer
- **Quarterly Tests**: DevOps Lead
- **Disaster Recovery**: On-Call Engineer

**Escalation**:
- **Level 1**: Check Supabase Dashboard and status page
- **Level 2**: Contact Supabase support (support@supabase.io)
- **Level 3**: Engage external disaster recovery consultant

**Emergency Contacts**:
- Database Admin: [Your DBA]
- DevOps Lead: [Your DevOps Lead]
- Security Lead: [Your Security Lead]
- Supabase Support: support@supabase.io

---

## Appendix: Useful Commands

```bash
# List all backups in Supabase
supabase db dump --list

# Check database size
psql -c "SELECT pg_size_pretty(pg_database_size('postgres'));"

# List all tables with row counts
psql -c "SELECT schemaname, tablename, n_live_tup FROM pg_stat_user_tables ORDER BY n_live_tup DESC;"

# Export RLS policies
pg_dump --schema-only -t 'posts' | grep -A 20 "POLICY"

# Test backup file integrity
pg_restore --list backup-20250114.dump | head -20
```

---

**Document Revision History**:
- 2025-01-14: Initial version created as part of security hardening
- Next review: 2025-04-14
