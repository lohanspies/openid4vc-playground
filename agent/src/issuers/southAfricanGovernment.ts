import { AGENT_HOST } from '../constants.js'
import type { CredentialConfigurationDisplay, MdocConfiguration, PlaygroundIssuerOptions } from '../issuer.js'
import type { StaticMdocSignInput } from '../types.js'
import { mobileDriversLicenseMdoc, mobileDriversLicenseMdocData } from './credentials/mDLMdoc.js'
import { photoIdMdoc, photoIdMdocData } from './credentials/photoIdMdoc.js'
import { zaAgeMdoc, zaAgeMdocData } from './credentials/zaAgeMdoc.js'
import { zaPidMdoc, zaPidMdocData } from './credentials/zaPidMdoc.js'
import { zaPidSdJwt, zaPidSdJwtData } from './credentials/zaPidSdJwt.js'
import { mvrcMdoc, mvrcMdocData } from './mvrc.js'

const zaPhotoIdDisplay = {
  ...photoIdMdoc.display[0],
  name: 'ZA Photo ID',
} satisfies CredentialConfigurationDisplay

const zaPhotoIdMdoc = {
  ...photoIdMdoc,
  display: [zaPhotoIdDisplay],
  credential_metadata: { ...photoIdMdoc.credential_metadata, display: [zaPhotoIdDisplay] },
} as const satisfies MdocConfiguration

const zaDrivingLicenseDisplay = {
  ...mobileDriversLicenseMdoc.display[0],
  name: 'ZA Driving License',
} satisfies CredentialConfigurationDisplay

const zaDrivingLicenseMdoc = {
  ...mobileDriversLicenseMdoc,
  display: [zaDrivingLicenseDisplay],
  credential_metadata: { ...mobileDriversLicenseMdoc.credential_metadata, display: [zaDrivingLicenseDisplay] },
} as const satisfies MdocConfiguration

const zaVehicleRegistrationDisplay = {
  ...mvrcMdoc.display[0],
  name: 'ZA Vehicle Registration',
} satisfies CredentialConfigurationDisplay

const zaVehicleRegistrationMdoc = {
  ...mvrcMdoc,
  display: [zaVehicleRegistrationDisplay],
  credential_metadata: { ...mvrcMdoc.credential_metadata, display: [zaVehicleRegistrationDisplay] },
} as const satisfies MdocConfiguration

const zaPhotoIdMdocData = {
  ...photoIdMdocData,
  credentialConfigurationId: 'za-photo-id-mdoc',
  credential: {
    ...photoIdMdocData.credential,
    namespaces: {
      ...photoIdMdocData.credential.namespaces,
      'org.iso.23220.1': {
        ...(photoIdMdocData.credential.namespaces as Record<string, Record<string, unknown>>)[
          'org.iso.23220.1'
        ],
        issuing_authority_unicode: 'Department of Home Affairs',
        issuing_country: 'ZA',
        birthplace: 'South Africa, Pretoria',
        resident_address_unicode: '1 Government Ave, Pretoria',
        resident_city_unicode: 'Pretoria',
        resident_postal_code: '0001',
        resident_country: 'ZA',
        nationality: 'ZA',
      },
      'org.iso.23220.photoID.1': {
        ...(photoIdMdocData.credential.namespaces as Record<string, Record<string, unknown>>)[
          'org.iso.23220.photoID.1'
        ],
        birth_country: 'ZA',
        birth_state: 'Gauteng',
        birth_city: 'Pretoria',
      },
    },
  },
} satisfies StaticMdocSignInput

const zaDrivingLicenseMdocData = {
  ...mobileDriversLicenseMdocData,
  credentialConfigurationId: 'za-driving-license-mdoc',
  credential: {
    ...mobileDriversLicenseMdocData.credential,
    namespaces: {
      ...mobileDriversLicenseMdocData.credential.namespaces,
      'org.iso.18013.5.1': {
        ...(mobileDriversLicenseMdocData.credential.namespaces as Record<string, Record<string, unknown>>)[
          'org.iso.18013.5.1'
        ],
        resident_postal_code: '0001',
        un_distinguishing_sign: 'ZA',
        issuing_authority: 'Road Traffic Management Corporation',
        issuing_country: 'ZA',
      },
    },
  },
} satisfies StaticMdocSignInput

const zaVehicleRegistrationMdocData = {
  ...mvrcMdocData,
  credentialConfigurationId: 'za-vehicle-registration-mdoc',
  credential: {
    ...mvrcMdocData.credential,
    namespaces: {
      ...mvrcMdocData.credential.namespaces,
      'org.iso.23220.1': {
        ...(mvrcMdocData.credential.namespaces as Record<string, Record<string, unknown>>)[
          'org.iso.23220.1'
        ],
        issuing_country: 'ZA',
        issuing_authority_unicode: 'eNaTIS',
      },
      'org.iso.7367.1': {
        ...(mvrcMdocData.credential.namespaces as Record<string, Record<string, unknown>>)[
          'org.iso.7367.1'
        ],
        issuing_country: 'ZA',
        issuing_authority_unicode: 'eNaTIS',
        un_distinguishing_sign: 'ZAF',
      },
    },
  },
} satisfies StaticMdocSignInput

export const southAfricanGovernmentIssuer = {
  tags: ['ZA PID', 'ZA Age', 'ZA Photo ID', 'Driving License', 'Vehicle Registration'],
  issuerId: 'f7cc7755-6ff2-4c79-bb12-1b76ea4b756f',
  credentialConfigurationsSupported: [
    {
      'dc+sd-jwt': {
        configuration: zaPidSdJwt,
        data: zaPidSdJwtData,
      },
      mso_mdoc: {
        configuration: zaPidMdoc,
        data: zaPidMdocData,
      },
    },
    {
      mso_mdoc: {
        configuration: zaAgeMdoc,
        data: zaAgeMdocData,
      },
    },
    {
      mso_mdoc: {
        configuration: zaPhotoIdMdoc,
        data: zaPhotoIdMdocData,
      },
    },
    {
      mso_mdoc: {
        configuration: zaDrivingLicenseMdoc,
        data: zaDrivingLicenseMdocData,
      },
    },
    {
      mso_mdoc: {
        configuration: zaVehicleRegistrationMdoc,
        data: zaVehicleRegistrationMdocData,
      },
    },
  ] as const,
  batchCredentialIssuance: {
    batchSize: 10,
  },
  display: [
    {
      name: 'South African Government',
      logo: {
        url: `${AGENT_HOST}/assets/issuers/za-government/issuer.svg`,
        uri: `${AGENT_HOST}/assets/issuers/za-government/issuer.svg`,
      },
    },
  ],
} satisfies PlaygroundIssuerOptions

export const southAfricanGovernmentCredentialsData = {
  [zaPidSdJwtData.credentialConfigurationId]: zaPidSdJwtData,
  [zaPidMdocData.credentialConfigurationId]: zaPidMdocData,
  [zaAgeMdocData.credentialConfigurationId]: zaAgeMdocData,
  [zaPhotoIdMdocData.credentialConfigurationId]: zaPhotoIdMdocData,
  [zaDrivingLicenseMdocData.credentialConfigurationId]: zaDrivingLicenseMdocData,
  [zaVehicleRegistrationMdocData.credentialConfigurationId]: zaVehicleRegistrationMdocData,
}
