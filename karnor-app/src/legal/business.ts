const publicValue = (value: string | undefined) => value?.trim() || '';

export const business = {
  brand: 'Karnor',
  legalName: publicValue(import.meta.env.VITE_SELLER_LEGAL_NAME) || 'Karin Nordlund',
  organizationNumber: publicValue(import.meta.env.VITE_SELLER_ORG_NUMBER),
  email: publicValue(import.meta.env.VITE_SELLER_EMAIL),
  phone: publicValue(import.meta.env.VITE_SELLER_PHONE),
  address: publicValue(import.meta.env.VITE_SELLER_ADDRESS),
};

export const sellerConfigured = Boolean(
  business.legalName && business.organizationNumber && business.email && business.address,
);

export const termsVersion = '2026-09-21';
