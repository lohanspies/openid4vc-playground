import { AGENT_HOST } from '../constants.js'
import { mobileDriversLicenseMdoc } from '../issuers/credentials/mDLMdoc.js'
import type { PlaygroundVerifierOptions } from '../verifier.js'
import { pidMdocCredential, pidSdJwtCredential } from './util.js'

export const southAfricanGovernmentVerifier = {
  verifierId: '3c0c3a1a-3b19-4b5c-8bd7-2b8a42b1a5f2',
  useCase: {
    name: 'South African Government',
    icon: 'government',
    tags: [],
  },
  clientMetadata: {
    logo_uri: `${AGENT_HOST}/assets/verifiers/government.png`,
    client_name: 'South African Government',
    'client_name#en': 'South African Government',
    'client_name#af': 'Suid-Afrikaanse Regering',
  } as const,
  requests: [
    {
      name: 'Identity verification - PID (sd-jwt-vc) or mDL (mdoc)',
      purpose: 'To access government services we need to verify your identity.',
      credentials: [
        pidSdJwtCredential({
          fields: ['given_name', 'family_name', 'birthdate', 'address.country'],
        }),
        pidMdocCredential({
          fields: ['given_name', 'family_name', 'birth_date', 'resident_country'],
        }),
        {
          format: 'mso_mdoc',
          doctype: mobileDriversLicenseMdoc.doctype,
          namespace: 'org.iso.18013.5.1',
          fields: ['given_name', 'family_name', 'birth_date', 'issuing_country'],
        },
      ],
      credential_sets: [[0], [1], [2]],
    },
  ],
} as const satisfies PlaygroundVerifierOptions
