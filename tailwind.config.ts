import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					info: 'hsl(var(--accent-info))',
					success: 'hsl(var(--accent-success))',
					warn: 'hsl(var(--accent-warn))',
					error: 'hsl(var(--accent-error))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				brand: {
					gradient: {
						from: 'hsl(var(--brand-gradient-from))',
						to: 'hsl(var(--brand-gradient-to))'
					}
				},
				bg: { page: 'hsl(var(--bg-page))' },
				surface: { glass: 'hsla(var(--glass))', border: 'hsla(var(--surface-border))' },
				text: {
					primary: 'hsl(var(--foreground))',
					secondary: 'hsl(var(--muted-foreground))',
					muted: 'hsl(var(--muted-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			typography: {
				DEFAULT: {
					css: {
						// Base text styling with proper contrast
						color: 'hsl(var(--foreground))',
						lineHeight: '1.75',
						
						// Paragraph styling - ensure high contrast  
						p: {
							color: 'hsl(var(--foreground) / 0.92)',
							fontSize: '1.0625rem',
							lineHeight: '1.75',
							marginTop: '1.25rem',
							marginBottom: '1.25rem',
						},
						
						// Headings
						'h1, h2, h3, h4, h5, h6': {
							color: 'hsl(var(--foreground))',
							fontWeight: '700',
							lineHeight: '1.25',
						},
						
						h1: {
							fontSize: '2.25rem',
							marginTop: '0',
							marginBottom: '2rem',
						},
						
						h2: {
							fontSize: '1.875rem',
							marginTop: '2.5rem',
							marginBottom: '1.5rem',
						},
						
						h3: {
							fontSize: '1.5rem',
							marginTop: '2rem',
							marginBottom: '1rem',
						},
						
						// Links
						a: {
							color: 'hsl(var(--primary))',
							textDecoration: 'underline',
							textUnderlineOffset: '3px',
							'&:hover': {
								color: 'hsl(var(--primary) / 0.8)',
							},
						},
						
						// Lists
						'ul, ol': {
							marginTop: '1.25rem',
							marginBottom: '1.25rem',
						},
						
						li: {
							marginTop: '0.5rem',
							marginBottom: '0.5rem',
						},
						
						'li::marker': {
							color: 'hsl(var(--muted-foreground))',
						},
						
						// Blockquotes
						blockquote: {
							borderLeft: '4px solid hsl(var(--primary) / 0.4)',
							paddingLeft: '1.5rem',
							fontStyle: 'italic',
							color: 'hsl(var(--muted-foreground))',
							marginTop: '1.5rem',
							marginBottom: '1.5rem',
						},
						
						// Code
						code: {
							color: 'hsl(var(--foreground))',
							backgroundColor: 'hsl(var(--muted) / 0.4)',
							padding: '0.125rem 0.25rem',
							borderRadius: '0.25rem',
							fontSize: '0.875rem',
							'&::before': { content: '""' },
							'&::after': { content: '""' },
						},
						
						// Pre blocks
						pre: {
							backgroundColor: 'hsl(var(--muted))',
							color: 'hsl(var(--foreground))',
							padding: '1rem',
							borderRadius: '0.5rem',
							overflowX: 'auto',
						},
						
						// Images
						img: {
							borderRadius: '0.5rem',
							marginTop: '1.5rem',
							marginBottom: '1.5rem',
						},
						
						// Strong and emphasis
						strong: {
							color: 'hsl(var(--foreground))',
							fontWeight: '700',
						},
						
						em: {
							fontStyle: 'italic',
						},
					},
				},
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;