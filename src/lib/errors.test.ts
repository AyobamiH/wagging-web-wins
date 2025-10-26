import { describe, it, expect } from 'vitest';
import {
  AppError,
  NotFoundError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  DatabaseError,
  NetworkError,
  ErrorCode,
  isAppError,
  getUserFriendlyMessage,
  createRepositoryError,
} from './errors';

describe('AppError', () => {
  it('should create an AppError with correct properties', () => {
    const error = new AppError(
      'Test error',
      ErrorCode.UNKNOWN_ERROR,
      500,
      { detail: 'test' }
    );

    expect(error.message).toBe('Test error');
    expect(error.code).toBe(ErrorCode.UNKNOWN_ERROR);
    expect(error.statusCode).toBe(500);
    expect(error.details).toEqual({ detail: 'test' });
    expect(error.isOperational).toBe(true);
  });

  it('should be an instance of Error', () => {
    const error = new AppError('Test');
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
  });

  it('should serialize to JSON correctly', () => {
    const error = new AppError('Test error', ErrorCode.VALIDATION_FAILED, 400);
    const json = error.toJSON();

    expect(json).toEqual({
      message: 'Test error',
      code: ErrorCode.VALIDATION_FAILED,
      statusCode: 400,
      details: undefined,
    });
  });
});

describe('Specific Error Classes', () => {
  it('should create NotFoundError correctly', () => {
    const error = new NotFoundError('User', '123');
    expect(error.message).toBe("User with identifier '123' not found");
    expect(error.code).toBe(ErrorCode.NOT_FOUND);
    expect(error.statusCode).toBe(404);
  });

  it('should create ValidationError correctly', () => {
    const error = new ValidationError('Invalid email format');
    expect(error.code).toBe(ErrorCode.VALIDATION_FAILED);
    expect(error.statusCode).toBe(400);
  });

  it('should create AuthenticationError correctly', () => {
    const error = new AuthenticationError();
    expect(error.code).toBe(ErrorCode.UNAUTHORIZED);
    expect(error.statusCode).toBe(401);
  });

  it('should create AuthorizationError correctly', () => {
    const error = new AuthorizationError();
    expect(error.code).toBe(ErrorCode.FORBIDDEN);
    expect(error.statusCode).toBe(403);
  });

  it('should create DatabaseError correctly', () => {
    const error = new DatabaseError('Query failed');
    expect(error.code).toBe(ErrorCode.DATABASE_ERROR);
    expect(error.statusCode).toBe(500);
  });

  it('should create NetworkError correctly', () => {
    const error = new NetworkError();
    expect(error.code).toBe(ErrorCode.NETWORK_ERROR);
    expect(error.statusCode).toBe(503);
  });
});

describe('Error Utilities', () => {
  it('should identify AppError correctly', () => {
    const appError = new AppError('Test');
    const regularError = new Error('Test');

    expect(isAppError(appError)).toBe(true);
    expect(isAppError(regularError)).toBe(false);
    expect(isAppError('string')).toBe(false);
    expect(isAppError(null)).toBe(false);
  });

  it('should get user-friendly messages', () => {
    const appError = new AppError('App error message');
    const regularError = new Error('Regular error message');
    const unknownError = 'string error';

    expect(getUserFriendlyMessage(appError)).toBe('App error message');
    expect(getUserFriendlyMessage(regularError)).toBe('Regular error message');
    expect(getUserFriendlyMessage(unknownError)).toBe('An unexpected error occurred. Please try again.');
  });

  it('should create repository errors correctly', () => {
    const error = createRepositoryError('fetch', 'posts', new Error('DB error'));

    expect(error.message).toBe('Failed to fetch posts');
    expect(error.code).toBe(ErrorCode.FETCH_FAILED);
    expect(error.statusCode).toBe(500);
  });
});
