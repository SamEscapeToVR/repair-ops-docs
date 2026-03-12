import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://docs.repairops.app',
  adapter: vercel(),
  integrations: [
    starlight({
      title: 'RepairOps Docs',
      description: 'Guides, API reference, workflow docs, and operational reference for the RepairOps platform.',
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: false,
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/SamEscapeToVR/repair-ops-saas',
        },
      ],
      customCss: ['./src/styles/custom.css'],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#2563eb',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://docs.repairops.app/og-image.svg',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:card',
            content: 'summary_large_image',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: 'https://docs.repairops.app/og-image.svg',
          },
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Quick Start Guide', slug: 'getting-started/quick-start' },
            { label: 'Your First Ticket', slug: 'getting-started/your-first-ticket' },
            { label: 'Team Setup & Roles', slug: 'getting-started/team-setup' },
            { label: 'Plans & Billing', slug: 'getting-started/plans-and-billing' },
          ],
        },
        {
          label: 'User Guide',
          items: [
            { label: 'Overview', slug: 'user-guide' },
            { label: 'Front Desk', slug: 'user-guide/front-desk' },
            { label: 'Technician', slug: 'user-guide/technician' },
            { label: 'Manager', slug: 'user-guide/manager' },
            { label: 'Customer Portal', slug: 'user-guide/customer-portal' },
          ],
        },
        {
          label: 'Features',
          items: [
            { label: 'Overview', slug: 'features' },
            { label: 'Knowledge Base + AI Chat', slug: 'features/knowledge-base' },
            { label: 'System Builder', slug: 'features/system-builder' },
            { label: 'AI Gateway', slug: 'features/ai-gateway' },
            { label: 'POS Terminal', slug: 'features/pos-terminal' },
            { label: 'Analytics & KPIs', slug: 'features/analytics' },
            { label: 'Plugins & Marketplace', slug: 'features/plugins' },
            { label: 'iFixit Repair Guides', slug: 'features/ifixit-guides' },
            { label: 'Tagging System', slug: 'features/tagging' },
          ],
        },
        {
          label: 'Reports',
          items: [
            { label: 'Overview', slug: 'reports' },
            { label: 'Day Report', slug: 'reports/day-report' },
            { label: 'Sales Reports', slug: 'reports/sales-reports' },
            { label: 'Payment Type Reports', slug: 'reports/payment-reports' },
            { label: 'Sales Tax Report', slug: 'reports/sales-tax' },
            { label: 'Fiscal Year Sales & Tax', slug: 'reports/fiscal-year' },
            { label: 'Tax Configuration', slug: 'reports/tax-configuration' },
            { label: 'Exporting Reports', slug: 'reports/exporting' },
          ],
        },
        {
          label: 'Admin Guide',
          items: [
            { label: 'Overview', slug: 'admin' },
            { label: 'Billing & Subscriptions', slug: 'admin/billing' },
            { label: 'SSO / SAML', slug: 'admin/sso' },
            { label: 'White-Label Branding', slug: 'admin/branding' },
            { label: 'Backups & Exports', slug: 'admin/backups' },
            { label: 'Security', slug: 'admin/security' },
          ],
        },
        {
          label: 'Developer',
          items: [
            { label: 'Overview', slug: 'developer' },
            { label: 'REST API Reference', slug: 'developer/api-reference' },
            { label: 'Plugin SDK', slug: 'developer/plugin-sdk' },
            { label: 'Self-Hosted Deployment', slug: 'developer/self-hosted' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Ticket State Machine', slug: 'reference/state-machine' },
            { label: 'Feature Matrix', slug: 'reference/feature-matrix' },
            { label: 'Role Permissions', slug: 'reference/permissions' },
            { label: 'Keyboard Shortcuts', slug: 'reference/shortcuts' },
            { label: 'Glossary', slug: 'reference/glossary' },
          ],
        },
        {
          label: 'Legal',
          items: [
            { label: 'Overview', slug: 'legal' },
            { label: 'Terms of Service', slug: 'legal/terms-of-service' },
            { label: 'Privacy Policy', slug: 'legal/privacy-policy' },
            { label: 'Cookie Policy', slug: 'legal/cookie-policy' },
            { label: 'Acceptable Use Policy', slug: 'legal/acceptable-use' },
            { label: 'Data Processing Addendum', slug: 'legal/dpa' },
          ],
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/SamEscapeToVR/repair-ops-saas/edit/main/docs-repairops-app/src/content/docs/',
      },
      lastUpdated: true,
      pagination: true,
      favicon: '/favicon.svg',
    }),
  ],
});
