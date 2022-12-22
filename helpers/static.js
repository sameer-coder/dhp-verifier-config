//Static content for now

const verifierConfigContent = {
    "id": "a8c8a845-25b5-4bfd-9a70-91d1c4d9ec11",
    "created_by": "hpass.default_verifier",
    "created_at": "2022-03-24T09:22:07Z",
    "updated_at": "2022-03-24T09:22:07Z",
    "version": "1.0.0",
    "name": "Signature and Expiration check only",
    "offline": true,
    "refresh": 86400,
    "masterCatalog": true,
    "specificationConfigurations": [
        {
            "id": "62ebbb00-9ca7-4a40-a4df-6a64d4cc6a45",
            "version": "1.0.0",
            "name": "DCC-VACCINATION",
            "description": "A credential issued according to the EU Digital COVID Certificate specification that indicates a person's COVID-19 vaccination status.",
            "credentialSpec": "DCC",
            "credentialSpecDisplayValue": "EU Digital COVID Certificate",
            "credentialCategory": "VACCINATION",
            "credentialCategoryDisplayValue": "COVID-19 Vaccination",
            "classifierRule": {
                "version": "1.0.0",
                "name": "Classifies a DCC vaccination certificate based on the schema.",
                "id": "85d7b0c0-de6b-461e-9373-fbd18f9c6836",
                "predicate": "{\"if\": [{\"var\": \"payload.v.0\"}, \"DCC-VACCINATION\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer",
                    "extract": {
                        "issuerDID": "*[0].is"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [
                {
                    "version": "1.0.0",
                    "name": "Display all DCC fields - vaccination",
                    "fields": [
                        {
                            "field": "nam.gn",
                            "displayValue": {
                                "en": "First Name",
                                "de": "Vorname"
                            }
                        },
                        {
                            "field": "nam.gnt",
                            "displayValue": {
                                "en": "First Name (transliterated)",
                                "de": "Vorname (transliteriert)"
                            }
                        },
                        {
                            "field": "nam.fn",
                            "displayValue": {
                                "en": "Surname",
                                "de": "Nachname"
                            }
                        },
                        {
                            "field": "nam.fnt",
                            "displayValue": {
                                "en": "Surname (transliterated)",
                                "de": "Nachname (transliteriert)"
                            }
                        },
                        {
                            "field": "dob",
                            "displayValue": {
                                "en": "Date of Birth",
                                "de": "Geburtsdatum"
                            }
                        },
                        {
                            "field": "v[0].tg",
                            "displayValue": {
                                "en": "Disease or agent targeted"
                            }
                        },
                        {
                            "field": "v[0].vp",
                            "displayValue": {
                                "en": "Vaccine or prophylaxis"
                            }
                        },
                        {
                            "field": "v[0].mp",
                            "displayValue": {
                                "en": "Vaccine medicinal product"
                            }
                        },
                        {
                            "field": "v[0].ma",
                            "displayValue": {
                                "en": "Marketing Authorization Holder"
                            }
                        },
                        {
                            "field": "v[0].dn",
                            "displayValue": {
                                "en": "Dose Number"
                            }
                        },
                        {
                            "field": "v[0].sd",
                            "displayValue": {
                                "en": "Total Series of Doses"
                            }
                        },
                        {
                            "field": "v[0].dt",
                            "displayValue": {
                                "en": "Date of Vaccination"
                            }
                        },
                        {
                            "field": "v[0].co",
                            "displayValue": {
                                "en": "Country of Vaccination"
                            }
                        },
                        {
                            "field": "v[0].is",
                            "displayValue": {
                                "en": "Certificate Issuer"
                            }
                        },
                        {
                            "field": "v[0].ci",
                            "displayValue": {
                                "en": "Certificate Issuer"
                            }
                        }
                    ],
                    "id": "13396cc0-2476-4a91-ac77-19324828cfc4"
                }
            ],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check that duration since getting the vaccination is in a predefined interval",
                    "id": "07dd8678-eacf-4002-8ca7-92f157697088",
                    "predicate": "{\"if\": [{\"var\": \"payload.v.0\"}, {\"if\": [{\"or\": [{\"and\": [{\"===\": [{\"var\": \"payload.v.0.sd\"}, 1]}, {\">\": [{\"var\": \"payload.v.0.dn\"}, {\"var\": \"payload.v.0.sd\"}]}]}, {\"and\": [{\">\": [{\"var\": \"payload.v.0.sd\"}, 2]}, {\">=\": [{\"var\": \"payload.v.0.dn\"}, {\"var\": \"payload.v.0.sd\"}]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.v.0.dt\"}, {\"var\": \"external.vaccinationValidAfterDaysBOOSTER.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.v.0.dt\"}, {\"var\": \"external.vaccinationValidityDurationDaysBOOSTER.0\"}, \"day\"]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.v.0.dt\"}, {\"var\": \"external.vaccinationValidAfterDays.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.v.0.dt\"}, {\"var\": \"external.vaccinationValidityDurationDays.0\"}, \"day\"]}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check for approved vaccine",
                    "id": "d8d8cb83-fce5-4722-98a2-3b0edc6d314e",
                    "predicate": "{\"if\": [{\"var\": \"payload.v.0\"}, {\"in\": [{\"var\": \"payload.v.0.mp\"}, {\"var\": \"external.approvedVaccinesEU\"}]}, false]}"
                },
                {
                    "version": "1.0.1",
                    "name": "Check that there is only single record in certificate",
                    "id": "afbc7321-c7d5-4fe1-ab83-cc04e90022fb",
                    "predicate": "{\"if\": [{\"var\": \"payload.v\"}, {\"!\": [{\"var\": \"payload.v.1\"}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check for completed vaccination cycle",
                    "id": "5ebca7a3-e99a-40fb-b61f-bca9576a77c0",
                    "predicate": "{\"if\": [{\"var\": \"payload.v.0\"}, {\"if\": [{\"===\": [{\"var\": \"external.requireBooster.0\"}, \"true\"]}, {\"or\": [{\"and\": [{\"===\": [{\"var\": \"payload.v.0.sd\"}, 1]}, {\">\": [{\"var\": \"payload.v.0.dn\"}, {\"var\": \"payload.v.0.sd\"}]}]}, {\"and\": [{\">\": [{\"var\": \"payload.v.0.sd\"}, 2]}, {\">=\": [{\"var\": \"payload.v.0.dn\"}, {\"var\": \"payload.v.0.sd\"}]}]}]}, {\">=\": [{\"var\": \"payload.v.0.dn\"}, {\"var\": \"payload.v.0.sd\"}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "528a4c41-ef92-4ac4-be72-3f3fc3260f3c",
            "version": "1.0.0",
            "name": "DCC-TEST",
            "description": "A credential issued according to the EU Digital COVID Certificate specification that indicates whether a person has completed a COVID-19 test.",
            "credentialSpec": "DCC",
            "credentialSpecDisplayValue": "EU Digital COVID Certificate",
            "credentialCategory": "TEST",
            "credentialCategoryDisplayValue": "COVID-19 Test Result",
            "classifierRule": {
                "version": "1.0.0",
                "name": "Classifies a DCC test certificate based on the schema.",
                "id": "d435dfea-aebb-4625-983a-1eedc57a9b88",
                "predicate": "{\"if\": [{\"var\": \"payload.t.0\"}, \"DCC-TEST\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer",
                    "extract": {
                        "issuerDID": "*[0].is"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [
                {
                    "version": "1.0.0",
                    "name": "Display all DCC fields - test",
                    "fields": [
                        {
                            "field": "nam.gn",
                            "displayValue": {
                                "en": "First Name",
                                "de": "Vorname"
                            }
                        },
                        {
                            "field": "nam.gnt",
                            "displayValue": {
                                "en": "First Name (transliterated)",
                                "de": "Vorname (transliteriert)"
                            }
                        },
                        {
                            "field": "nam.fn",
                            "displayValue": {
                                "en": "Surname",
                                "de": "Nachname"
                            }
                        },
                        {
                            "field": "nam.fnt",
                            "displayValue": {
                                "en": "Surname (transliterated)",
                                "de": "Nachname (transliteriert)"
                            }
                        },
                        {
                            "field": "dob",
                            "displayValue": {
                                "en": "Date of Birth",
                                "de": "Geburtsdatum"
                            }
                        },
                        {
                            "field": "t[0].tg",
                            "displayValue": {
                                "en": "Disease or agent targeted"
                            }
                        },
                        {
                            "field": "t[0].tt",
                            "displayValue": {
                                "en": "Type of Test"
                            }
                        },
                        {
                            "field": "t[0].nm",
                            "displayValue": {
                                "en": "Test Name"
                            }
                        },
                        {
                            "field": "t[0].ma",
                            "displayValue": {
                                "en": "Test manufacturer"
                            }
                        },
                        {
                            "field": "t[0].sc",
                            "displayValue": {
                                "en": "Date/Time of Sample Collection"
                            }
                        },
                        {
                            "field": "t[0].tr",
                            "displayValue": {
                                "en": "Test Result"
                            }
                        },
                        {
                            "field": "t[0].tc",
                            "displayValue": {
                                "en": "Testing Centre"
                            }
                        },
                        {
                            "field": "t[0].co",
                            "displayValue": {
                                "en": "Country of Test"
                            }
                        },
                        {
                            "field": "t[0].is",
                            "displayValue": {
                                "en": "Certificate Issuer"
                            }
                        },
                        {
                            "field": "t[0].ci",
                            "displayValue": {
                                "en": "Unique Certificate Identifier"
                            }
                        }
                    ],
                    "id": "bd1c5492-4b6e-4919-93bf-457dc6df793f"
                }
            ],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check that duration since test is less then predefined value",
                    "id": "61a3bbfb-422d-40d0-a5a6-56f6cba003cb",
                    "predicate": "{\"if\": [{\"var\": \"payload.t.0\"}, {\"or\": [{\"and\": [{\"in\": [{\"var\": \"payload.t.0.tt\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.t.0.sc\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.t.0.sc\"}, {\"var\": \"external.testValidityDurationHoursPCR.0\"}, \"hour\"]}]}]}, {\"and\": [{\"in\": [{\"var\": \"payload.t.0.tt\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.t.0.sc\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.t.0.sc\"}, {\"var\": \"external.testValidityDurationHoursANTIGEN.0\"}, \"hour\"]}]}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check for approved test",
                    "id": "fb830f1f-9844-49a1-9820-d043409abecb",
                    "predicate": "{\"if\": [{\"var\": \"payload.t.0\"}, {\"or\": [{\"in\": [{\"var\": \"payload.t.0.tt\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"in\": [{\"var\": \"payload.t.0.tt\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check for negative test result",
                    "id": "8a2cf6ef-f44d-4f5c-8448-3262d983e865",
                    "predicate": "{\"if\": [{\"var\": \"payload.t.0\"}, {\"in\": [{\"var\": \"payload.t.0.tr\"}, {\"var\": \"external.acceptedTestResults\"}]}, false]}"
                },
                {
                    "version": "1.0.1",
                    "name": "Check that there is only single record in certificate",
                    "id": "90ec030b-aa1e-48b0-9919-0a593e22e1ed",
                    "predicate": "{\"if\": [{\"var\": \"payload.t\"}, {\"!\": [{\"var\": \"payload.t.1\"}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "76154d1a-c769-4c4f-9b2c-a383007190b4",
            "version": "1.0.0",
            "name": "DCC-RECOVERY",
            "description": "A credential issued according to the EU Digital COVID Certificate specification that indicates a person's recovery from COVID-19.",
            "credentialSpec": "DCC",
            "credentialSpecDisplayValue": "EU Digital COVID Certificate",
            "credentialCategory": "RECOVERY",
            "credentialCategoryDisplayValue": "COVID-19 Recovery",
            "classifierRule": {
                "version": "1.0.0",
                "name": "Classifies a DCC recovery certificate based on the schema.",
                "id": "b5408bf7-f3c7-4454-8684-de4a02481eeb",
                "predicate": "{\"if\": [{\"var\": \"payload.r.0\"}, \"DCC-RECOVERY\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer",
                    "extract": {
                        "issuerDID": "*[0].is"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [
                {
                    "version": "1.0.0",
                    "name": "Display all DCC fields - recovery",
                    "fields": [
                        {
                            "field": "nam.gn",
                            "displayValue": {
                                "en": "First Name",
                                "de": "Vorname"
                            }
                        },
                        {
                            "field": "nam.gnt",
                            "displayValue": {
                                "en": "First Name (transliterated)",
                                "de": "Vorname (transliteriert)"
                            }
                        },
                        {
                            "field": "nam.fn",
                            "displayValue": {
                                "en": "Surname",
                                "de": "Nachname"
                            }
                        },
                        {
                            "field": "nam.fnt",
                            "displayValue": {
                                "en": "Surname (transliterated)",
                                "de": "Nachname (transliteriert)"
                            }
                        },
                        {
                            "field": "dob",
                            "displayValue": {
                                "en": "Date of Birth",
                                "de": "Geburtsdatum"
                            }
                        },
                        {
                            "field": "r[0].tg",
                            "displayValue": {
                                "en": "Disease or agent targeted"
                            }
                        },
                        {
                            "field": "r[0].fr",
                            "displayValue": {
                                "en": "Date of first positive test result"
                            }
                        },
                        {
                            "field": "r[0].co",
                            "displayValue": {
                                "en": "Country of Test"
                            }
                        },
                        {
                            "field": "r[0].is",
                            "displayValue": {
                                "en": "Certificate Issuer"
                            }
                        },
                        {
                            "field": "r[0].df",
                            "displayValue": {
                                "en": "Certificate Valid From"
                            }
                        },
                        {
                            "field": "r[0].du",
                            "displayValue": {
                                "en": "Certificate Valid Until"
                            }
                        },
                        {
                            "field": "r[0].ci",
                            "displayValue": {
                                "en": "Unique Certificate Identifier"
                            }
                        }
                    ],
                    "id": "c55b533f-5b4c-4b57-88d6-3a0cc654d52f"
                }
            ],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check if recovery is from predefined disease",
                    "id": "4d8cbbe4-059a-406b-9b72-13164aa46c27",
                    "predicate": "{\"if\": [{\"var\": \"payload.r.0\"}, {\"in\": [{\"var\": \"payload.r.0.tg\"}, {\"var\": \"external.approvedDiseases\"}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check current date is within the covered dates for recovery",
                    "id": "eab75840-3896-4377-8237-35b9e079a907",
                    "predicate": "{\"if\": [{\"var\": \"payload.r.0\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.r.0.df\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.r.0.du\"}, 0, \"day\"]}]}, false]}"
                },
                {
                    "version": "1.0.1",
                    "name": "Check that there is only single record in certificate",
                    "id": "f6f81718-f4ff-4e6d-88b9-202db5da5c46",
                    "predicate": "{\"if\": [{\"var\": \"payload.r\"}, {\"!\": [{\"var\": \"payload.r.1\"}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "dd150cae-b567-4ce6-8525-cceaea07334b",
            "version": "1.0.0",
            "name": "GHP-TEST",
            "description": "A credential issued according to the Good Health Pass specification that indicates whether a person has completed a COVID-19 test.",
            "credentialSpec": "GHP",
            "credentialSpecDisplayValue": "Good Health Pass",
            "credentialCategory": "TEST",
            "credentialCategoryDisplayValue": "COVID-19 Test Result",
            "classifierRule": {
                "version": "1.0.0",
                "name": "Classifies a GHP test certificate based on the value in type field.",
                "id": "9ce08db0-6eda-49eb-9338-fe080a1639d7",
                "predicate": "{\"if\": [{\"and\": [{\"in\": [\"GoodHealthPass\", {\"var\": \"payload.type\"}]}, {\"in\": [\"TestCredential\", {\"var\": \"payload.type\"}]}]}, \"GHP-TEST\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer, type",
                    "extract": {
                        "issuerDID": "issuer",
                        "credentialType": "type.2"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [
                {
                    "version": "1.0.0",
                    "name": "Display all fields - test",
                    "fields": [
                        {
                            "field": "issuer",
                            "displayValue": {
                                "en": "issuer"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.givenName",
                            "displayValue": {
                                "en": "First Name"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.familyName",
                            "displayValue": {
                                "en": "Surname"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.birthDate",
                            "displayValue": {
                                "en": "Date of Birth"
                            }
                        },
                        {
                            "field": "credentialSubject.testType",
                            "displayValue": {
                                "en": "Test"
                            }
                        },
                        {
                            "field": "credentialSubject.testManufacturer",
                            "displayValue": {
                                "en": "Manufacturer"
                            }
                        },
                        {
                            "field": "credentialSubject.testResult",
                            "displayValue": {
                                "en": "Result"
                            }
                        },
                        {
                            "field": "credentialSubject.dateOfSample",
                            "displayValue": {
                                "en": "Date of Test"
                            }
                        },
                        {
                            "field": "credentialSubject.dateOfResult",
                            "displayValue": {
                                "en": "Date of Test Result"
                            }
                        },
                        {
                            "field": "credentialSubject.stateOfVaccination",
                            "displayValue": {
                                "en": "State/province of test"
                            }
                        },
                        {
                            "field": "credentialSubject.countryOfVaccination",
                            "displayValue": {
                                "en": "Country of test"
                            }
                        }
                    ],
                    "id": "b2814c18-2256-4c89-955a-e4ed846cc2c2"
                }
            ],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check for approved test",
                    "id": "0464bfe4-97df-422c-9ef8-3b10ea4c69f6",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-PCR\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-ANTIGEN\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check that duration since test is less then predefined value",
                    "id": "dbfb7694-fe3f-4cfb-92bd-76b1c2195f0a",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"and\": [{\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-PCR\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, {\"var\": \"external.testValidityDurationHoursPCR.0\"}, \"hour\"]}]}]}, {\"and\": [{\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-ANTIGEN\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, {\"var\": \"external.testValidityDurationHoursANTIGEN.0\"}, \"hour\"]}]}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check for negative test result",
                    "id": "e6749362-0ae3-4f01-a0e3-e44799e37e4b",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"in\": [{\"var\": \"payload.credentialSubject.testResult\"}, {\"var\": \"external.acceptedTestResults\"}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "e158320f-9333-4a21-8d3f-1c4a6519b55d",
            "version": "1.0.0",
            "name": "GHP-VACCINATION",
            "description": "A credential issued according to the Good Health Pass specification that indicates a person's COVID-19 vaccination status.",
            "credentialSpec": "GHP",
            "credentialSpecDisplayValue": "Good Health Pass",
            "credentialCategory": "VACCINATION",
            "credentialCategoryDisplayValue": "COVID-19 Vaccination",
            "classifierRule": {
                "version": "1.0.0",
                "name": "Classifies a GHP vaccination certificate based on the value in type field.",
                "id": "6442a7db-63b3-4808-b410-b687b51a4667",
                "predicate": "{\"if\": [{\"and\": [{\"in\": [\"GoodHealthPass\", {\"var\": \"payload.type\"}]}, {\"in\": [\"VaccinationCredential\", {\"var\": \"payload.type\"}]}]}, \"GHP-VACCINATION\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer, type",
                    "extract": {
                        "issuerDID": "issuer",
                        "credentialType": "type.2"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [
                {
                    "version": "1.0.0",
                    "name": "Display all fields - vaccination",
                    "fields": [
                        {
                            "field": "issuer",
                            "displayValue": {
                                "en": "issuer"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.givenName",
                            "displayValue": {
                                "en": "First Name"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.familyName",
                            "displayValue": {
                                "en": "Surname"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.birthDate",
                            "displayValue": {
                                "en": "Date of Birth"
                            }
                        },
                        {
                            "field": "credentialSubject.medicinalProductCode",
                            "displayValue": {
                                "en": "Vaccine Code"
                            }
                        },
                        {
                            "field": "credentialSubject.medicinalProductName",
                            "displayValue": {
                                "en": "Vaccine"
                            }
                        },
                        {
                            "field": "credentialSubject.marketingAuthorizationHolder",
                            "displayValue": {
                                "en": "Manufacturer"
                            }
                        },
                        {
                            "field": "credentialSubject.cvxCode",
                            "displayValue": {
                                "en": "Vaccine Code"
                            }
                        },
                        {
                            "field": "credentialSubject.dateOfVaccination",
                            "displayValue": {
                                "en": "Vaccination Date"
                            }
                        },
                        {
                            "field": "credentialSubject.stateOfVaccination",
                            "displayValue": {
                                "en": "Vaccination State"
                            }
                        },
                        {
                            "field": "credentialSubject.countryOfVaccination",
                            "displayValue": {
                                "en": "Vaccination Country"
                            }
                        }
                    ],
                    "id": "9a91da72-5971-4f24-8e69-382cccaf38f3"
                }
            ],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check for completed vaccination cycle",
                    "id": "3b317598-eef1-4573-9638-6a2482d48d17",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"if\": [{\"===\": [{\"var\": \"external.requireBooster.0\"}, \"true\"]}, {\"if\": [{\"var\": \"payload.credentialSubject.booster\"}, {\">=\": [{\"var\": \"payload.credentialSubject.doseNumber\"}, {\"var\": \"payload.credentialSubject.dosesPerCycle\"}]}, {\"or\": [{\"and\": [{\"===\": [{\"var\": \"payload.credentialSubject.dosesPerCycle\"}, 1]}, {\">\": [{\"var\": \"payload.credentialSubject.doseNumber\"}, {\"var\": \"payload.credentialSubject.dosesPerCycle\"}]}]}, {\"and\": [{\">\": [{\"var\": \"payload.credentialSubject.dosesPerCycle\"}, 2]}, {\">=\": [{\"var\": \"payload.credentialSubject.doseNumber\"}, {\"var\": \"payload.credentialSubject.dosesPerCycle\"}]}]}]}]}, {\">=\": [{\"var\": \"payload.credentialSubject.doseNumber\"}, {\"var\": \"payload.credentialSubject.dosesPerCycle\"}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check that duration since getting the vaccination is in a predefined interval",
                    "id": "57327cbe-f9f8-4e86-b565-4138c1949d6c",
                    "predicate": "{\"if\": [{\"if\": [{\"var\": \"payload.credentialSubject.booster\"}, {\"===\": [{\"var\": \"payload.credentialSubject.booster\"}, true]}, {\"or\": [{\"and\": [{\"===\": [{\"var\": \"payload.credentialSubject.dosesPerCycle\"}, 1]}, {\">\": [{\"var\": \"payload.credentialSubject.doseNumber\"}, {\"var\": \"payload.credentialSubject.dosesPerCycle\"}]}]}, {\"and\": [{\">\": [{\"var\": \"payload.credentialSubject.dosesPerCycle\"}, 2]}, {\">=\": [{\"var\": \"payload.credentialSubject.doseNumber\"}, {\"var\": \"payload.credentialSubject.dosesPerCycle\"}]}]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfVaccination\"}, {\"var\": \"external.vaccinationValidAfterDaysBOOSTER.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfVaccination\"}, {\"var\": \"external.vaccinationValidityDurationDaysBOOSTER.0\"}, \"day\"]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfVaccination\"}, {\"var\": \"external.vaccinationValidAfterDays.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfVaccination\"}, {\"var\": \"external.vaccinationValidityDurationDays.0\"}, \"day\"]}]}]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check for approved vaccine",
                    "id": "a0295a42-fac0-489a-90bd-d07f9e70b481",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.cvxCode\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.medicinalProductCode\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.cvxCode\"}, {\"var\": \"external.approvedVaccinesEU\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.medicinalProductCode\"}, {\"var\": \"external.approvedVaccinesEU\"}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "9a9f92f9-9c05-4957-bc7c-de6e20966000",
            "version": "1.0.0",
            "name": "IDHP-TEST",
            "description": "A credential issued according to the Digital Health Pass specification that indicates whether a person has completed a COVID-19 test.",
            "credentialSpec": "IDHP",
            "credentialSpecDisplayValue": "Digital Health Pass",
            "credentialCategory": "TEST",
            "credentialCategoryDisplayValue": "COVID-19 Test Result",
            "classifierRule": {
                "version": "1.0.0",
                "name": "Classifies a IDHP test certificate based on the value in type field.",
                "id": "150a71ee-0464-4ba6-b806-ee075a1d20a2",
                "predicate": "{\"if\": [{\"and\": [{\"in\": [\"IBMDigitalHealthPass\", {\"var\": \"payload.type\"}]}, {\"in\": [\"Test\", {\"var\": \"payload.type\"}]}]}, \"IDHP-TEST\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer, type",
                    "extract": {
                        "issuerDID": "issuer",
                        "credentialType": "type.2"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [
                {
                    "version": "1.0.0",
                    "name": "Display all fields - test",
                    "fields": [
                        {
                            "field": "issuer",
                            "displayValue": {
                                "en": "issuer"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.givenName",
                            "displayValue": {
                                "en": "First Name"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.familyName",
                            "displayValue": {
                                "en": "Surname"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.birthDate",
                            "displayValue": {
                                "en": "Date of Birth"
                            }
                        },
                        {
                            "field": "credentialSubject.testType",
                            "displayValue": {
                                "en": "Test"
                            }
                        },
                        {
                            "field": "credentialSubject.testManufacturer",
                            "displayValue": {
                                "en": "Manufacturer"
                            }
                        },
                        {
                            "field": "credentialSubject.testResult",
                            "displayValue": {
                                "en": "Result"
                            }
                        },
                        {
                            "field": "credentialSubject.dateOfSample",
                            "displayValue": {
                                "en": "Date of Test"
                            }
                        },
                        {
                            "field": "credentialSubject.dateOfResult",
                            "displayValue": {
                                "en": "Date of Test Result"
                            }
                        },
                        {
                            "field": "credentialSubject.stateOfVaccination",
                            "displayValue": {
                                "en": "State/province of test"
                            }
                        },
                        {
                            "field": "credentialSubject.countryOfVaccination",
                            "displayValue": {
                                "en": "Country of test"
                            }
                        }
                    ],
                    "id": "b2814c18-2256-4c89-955a-e4ed846cc2c2"
                }
            ],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check for approved test",
                    "id": "0464bfe4-97df-422c-9ef8-3b10ea4c69f6",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-PCR\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-ANTIGEN\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check that duration since test is less then predefined value",
                    "id": "dbfb7694-fe3f-4cfb-92bd-76b1c2195f0a",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"and\": [{\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-PCR\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, {\"var\": \"external.testValidityDurationHoursPCR.0\"}, \"hour\"]}]}]}, {\"and\": [{\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-ANTIGEN\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, {\"var\": \"external.testValidityDurationHoursANTIGEN.0\"}, \"hour\"]}]}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check for negative test result",
                    "id": "e6749362-0ae3-4f01-a0e3-e44799e37e4b",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"in\": [{\"var\": \"payload.credentialSubject.testResult\"}, {\"var\": \"external.acceptedTestResults\"}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "52dba9c4-301b-4b52-970f-2f47b7d0480b",
            "version": "1.0.0",
            "name": "IDHP-VACCINATION",
            "description": "A credential issued according to the IBM Digital Health specification that indicates a person's COVID-19 vaccination status.",
            "credentialSpec": "IDHP",
            "credentialSpecDisplayValue": "Digital Health Pass",
            "credentialCategory": "VACCINATION",
            "credentialCategoryDisplayValue": "COVID-19 Vaccination",
            "classifierRule": {
                "version": "1.0.0",
                "name": "Classifies a IDHP vaccination certificate based on the value in type field.",
                "id": "e1d4ca09-47a8-420d-96a6-9e612ab6baf4",
                "predicate": "{\"if\": [{\"and\": [{\"in\": [\"IBMDigitalHealthPass\", {\"var\": \"payload.type\"}]}, {\"in\": [\"Vaccination\", {\"var\": \"payload.type\"}]}]}, \"IDHP-VACCINATION\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer, type",
                    "extract": {
                        "issuerDID": "issuer",
                        "credentialType": "type.2"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [
                {
                    "version": "1.0.0",
                    "name": "Display all fields - vaccination",
                    "fields": [
                        {
                            "field": "issuer",
                            "displayValue": {
                                "en": "issuer"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.givenName",
                            "displayValue": {
                                "en": "First Name"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.familyName",
                            "displayValue": {
                                "en": "Surname"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.birthDate",
                            "displayValue": {
                                "en": "Date of Birth"
                            }
                        },
                        {
                            "field": "credentialSubject.medicinalProductCode",
                            "displayValue": {
                                "en": "Vaccine Code"
                            }
                        },
                        {
                            "field": "credentialSubject.medicinalProductName",
                            "displayValue": {
                                "en": "Vaccine"
                            }
                        },
                        {
                            "field": "credentialSubject.marketingAuthorizationHolder",
                            "displayValue": {
                                "en": "Manufacturer"
                            }
                        },
                        {
                            "field": "credentialSubject.cvxCode",
                            "displayValue": {
                                "en": "Vaccine Code"
                            }
                        },
                        {
                            "field": "credentialSubject.dateOfVaccination",
                            "displayValue": {
                                "en": "Vaccination Date"
                            }
                        },
                        {
                            "field": "credentialSubject.stateOfVaccination",
                            "displayValue": {
                                "en": "Vaccination State"
                            }
                        },
                        {
                            "field": "credentialSubject.countryOfVaccination",
                            "displayValue": {
                                "en": "Vaccination Country"
                            }
                        }
                    ],
                    "id": "9a91da72-5971-4f24-8e69-382cccaf38f3"
                }
            ],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check for completed vaccination cycle",
                    "id": "3b317598-eef1-4573-9638-6a2482d48d17",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"if\": [{\"===\": [{\"var\": \"external.requireBooster.0\"}, \"true\"]}, {\"if\": [{\"var\": \"payload.credentialSubject.booster\"}, {\">=\": [{\"var\": \"payload.credentialSubject.doseNumber\"}, {\"var\": \"payload.credentialSubject.dosesPerCycle\"}]}, {\"or\": [{\"and\": [{\"===\": [{\"var\": \"payload.credentialSubject.dosesPerCycle\"}, 1]}, {\">\": [{\"var\": \"payload.credentialSubject.doseNumber\"}, {\"var\": \"payload.credentialSubject.dosesPerCycle\"}]}]}, {\"and\": [{\">\": [{\"var\": \"payload.credentialSubject.dosesPerCycle\"}, 2]}, {\">=\": [{\"var\": \"payload.credentialSubject.doseNumber\"}, {\"var\": \"payload.credentialSubject.dosesPerCycle\"}]}]}]}]}, {\">=\": [{\"var\": \"payload.credentialSubject.doseNumber\"}, {\"var\": \"payload.credentialSubject.dosesPerCycle\"}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check that duration since getting the vaccination is in a predefined interval",
                    "id": "57327cbe-f9f8-4e86-b565-4138c1949d6c",
                    "predicate": "{\"if\": [{\"if\": [{\"var\": \"payload.credentialSubject.booster\"}, {\"===\": [{\"var\": \"payload.credentialSubject.booster\"}, true]}, {\"or\": [{\"and\": [{\"===\": [{\"var\": \"payload.credentialSubject.dosesPerCycle\"}, 1]}, {\">\": [{\"var\": \"payload.credentialSubject.doseNumber\"}, {\"var\": \"payload.credentialSubject.dosesPerCycle\"}]}]}, {\"and\": [{\">\": [{\"var\": \"payload.credentialSubject.dosesPerCycle\"}, 2]}, {\">=\": [{\"var\": \"payload.credentialSubject.doseNumber\"}, {\"var\": \"payload.credentialSubject.dosesPerCycle\"}]}]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfVaccination\"}, {\"var\": \"external.vaccinationValidAfterDaysBOOSTER.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfVaccination\"}, {\"var\": \"external.vaccinationValidityDurationDaysBOOSTER.0\"}, \"day\"]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfVaccination\"}, {\"var\": \"external.vaccinationValidAfterDays.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfVaccination\"}, {\"var\": \"external.vaccinationValidityDurationDays.0\"}, \"day\"]}]}]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check for approved vaccine",
                    "id": "a0295a42-fac0-489a-90bd-d07f9e70b481",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.cvxCode\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.medicinalProductCode\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.cvxCode\"}, {\"var\": \"external.approvedVaccinesEU\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.medicinalProductCode\"}, {\"var\": \"external.approvedVaccinesEU\"}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "00308a43-98ee-464f-8ae9-0caa8b62766d",
            "version": "1.0.0",
            "name": "IDHP-TEMPERATURE",
            "description": "A credential issued according to the Digital Health Pass specification that indicates a person's temperature.",
            "credentialSpec": "IDHP",
            "credentialSpecDisplayValue": "Digital Health Pass",
            "credentialCategory": "TEMPERATURE",
            "credentialCategoryDisplayValue": "Temperature Scan",
            "classifierRule": {
                "version": "1.0.0",
                "name": "Classifies a IDHP temperature certificate based on the value in type field.",
                "id": "1bae7641-9821-45e0-b11e-6b2d20a02613",
                "predicate": "{\"if\": [{\"and\": [{\"in\": [\"IBMDigitalHealthPass\", {\"var\": \"payload.type\"}]}, {\"in\": [\"Temperature\", {\"var\": \"payload.type\"}]}]}, \"IDHP-TEMPERATURE\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer, type",
                    "extract": {
                        "issuerDID": "issuer",
                        "credentialType": "type.2"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [
                {
                    "version": "1.0.0",
                    "name": "Display all fields - pass, temperature",
                    "fields": [
                        {
                            "field": "issuer",
                            "displayValue": {
                                "en": "issuer"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.givenName",
                            "displayValue": {
                                "en": "First Name"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.familyName",
                            "displayValue": {
                                "en": "Surname"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.birthDate",
                            "displayValue": {
                                "en": "Date of Birth"
                            }
                        },
                        {
                            "field": "credentialSubject.date",
                            "displayValue": {
                                "en": "Date"
                            }
                        },
                        {
                            "field": "credentialSubject.status",
                            "displayValue": {
                                "en": "Status"
                            }
                        },
                        {
                            "field": "credentialSubject.temperature",
                            "displayValue": {
                                "en": "Temperature"
                            }
                        },
                        {
                            "field": "credentialSubject.units",
                            "displayValue": {
                                "en": "Units"
                            }
                        }
                    ],
                    "id": "0c446646-adce-48c2-aa52-1d13c8bbe744"
                }
            ],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check that duration since taking the temperature is less then predefined value",
                    "id": "3fd0d331-9a67-46f5-8f1e-738535450352",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.date\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.date\"}, {\"var\": \"external.temperatureValidityDurationHours.0\"}, \"hour\"]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check that the temperature is normal",
                    "id": "4b880223-815f-4bdd-bf74-c3e8e97bf70f",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"and\": [{\"===\": [{\"var\": \"payload.credentialSubject.units\"}, \"C\"]}, {\"lessThan\": [{\"var\": \"payload.credentialSubject.temperature\"}, {\"var\": \"external.normalTemperatureTresholdCelsius.0\"}]}]}, {\"and\": [{\"===\": [{\"var\": \"payload.credentialSubject.units\"}, \"F\"]}, {\"lessThan\": [{\"var\": \"payload.credentialSubject.temperature\"}, {\"var\": \"external.normalTemperatureTresholdFahrenheit.0\"}]}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "a4d9eeec-9d51-46a0-90fa-947240798a8e",
            "version": "1.0.0",
            "name": "IDHP-PASS",
            "description": "A credential issued according to the Digital Health Pass specification that indicates whether a person has been issued a pass.",
            "credentialSpec": "IDHP",
            "credentialSpecDisplayValue": "Digital Health Pass",
            "credentialCategory": "PASS",
            "credentialCategoryDisplayValue": "Pass",
            "classifierRule": {
                "version": "1.0.0",
                "name": "Classifies a IDHP pass certificate based on the value in type field.",
                "id": "cf6336bd-4ef2-4a01-8aec-1b63452b8665",
                "predicate": "{\"if\": [{\"and\": [{\"in\": [\"IBMDigitalHealthPass\", {\"var\": \"payload.type\"}]}, {\"in\": [\"Pass\", {\"var\": \"payload.type\"}]}]}, \"IDHP-PASS\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer, type",
                    "extract": {
                        "issuerDID": "issuer",
                        "credentialType": "type.2"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [
                {
                    "version": "1.0.0",
                    "name": "Display all fields - pass, temperature",
                    "fields": [
                        {
                            "field": "issuer",
                            "displayValue": {
                                "en": "issuer"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.givenName",
                            "displayValue": {
                                "en": "First Name"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.familyName",
                            "displayValue": {
                                "en": "Surname"
                            }
                        },
                        {
                            "field": "credentialSubject.recipient.birthDate",
                            "displayValue": {
                                "en": "Date of Birth"
                            }
                        },
                        {
                            "field": "credentialSubject.date",
                            "displayValue": {
                                "en": "Date"
                            }
                        },
                        {
                            "field": "credentialSubject.status",
                            "displayValue": {
                                "en": "Status"
                            }
                        },
                        {
                            "field": "credentialSubject.temperature",
                            "displayValue": {
                                "en": "Temperature"
                            }
                        },
                        {
                            "field": "credentialSubject.units",
                            "displayValue": {
                                "en": "Units"
                            }
                        }
                    ],
                    "id": "0c446646-adce-48c2-aa52-1d13c8bbe744"
                }
            ],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check that duration since getting the pass is less then predefined value",
                    "id": "4f4fb938-0633-4af0-8c64-a785dc8f8a04",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.date\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.date\"}, {\"var\": \"external.passValidityDurationHours.0\"}, \"hour\"]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check for a pass status",
                    "id": "75916ba4-16ec-48cc-b8c1-d808e269823e",
                    "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"in\": [{\"var\": \"payload.credentialSubject.status\"}, {\"var\": \"external.acceptedPassStatus\"}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "0df225f1-93e4-45b1-8f8e-e452d1f1be81",
            "version": "1.0.0",
            "name": "SHC-TEST",
            "description": "A credential issued according to the SMART Health Card specification that indicates whether a person has completed a COVID-19 test.",
            "credentialSpec": "SHC",
            "credentialSpecDisplayValue": "Smart Health Card",
            "credentialCategory": "TEST",
            "credentialCategoryDisplayValue": "COVID-19 Test Result",
            "classifierRule": {
                "version": "1.0.0",
                "name": "Classifies a SHC test certificate based on the value in type field.",
                "id": "5ca7034e-759b-406f-884b-b2143edced84",
                "predicate": "{\"if\": [{\"in\": [\"https://smarthealth.cards#laboratory\", {\"var\": \"payload.vc.type\"}]}, \"SHC-TEST\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer, type",
                    "extract": {
                        "issuerDID": "iss",
                        "credentialType": "vc.type.2"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [
                {
                    "version": "1.0.0",
                    "name": "Display all fields - test",
                    "fields": [
                        {
                            "field": "vc.credentialSubjec.fhirBundle.entry[0].name[0].text",
                            "displayValue": {
                                "en": "Full Name"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[0].resource.name[0].given",
                            "displayValue": {
                                "en": "First Name",
                                "de": "Vorname"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[0].resource.name[0].family",
                            "displayValue": {
                                "en": "Surname",
                                "de": "Nachname"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[0].resource.birthDate",
                            "displayValue": {
                                "en": "Date of Birth",
                                "de": "Geburtsdatum"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.code.coding[0].display",
                            "displayValue": {
                                "en": "Test",
                                "de": "Test"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.code.coding[0].code",
                            "displayValue": {
                                "en": "Test Code",
                                "de": "Testcode"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.valueCodeableConcept.coding[0].code",
                            "displayValue": {
                                "en": "Result",
                                "de": "Ergebnis"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.effectiveDateTime",
                            "displayValue": {
                                "en": "Date of Test",
                                "de": "Datum des Test"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.performer[0].actor.display",
                            "displayValue": {
                                "en": "Test organization",
                                "de": "Testorganisation"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.location.address.state",
                            "displayValue": {
                                "en": "State/Province of Test",
                                "de": "Staat/Bundesland Test"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.location.address.country",
                            "displayValue": {
                                "en": "Country of Test",
                                "de": "Testland"
                            }
                        }
                    ],
                    "id": "54ee3c7c-0f41-4728-b3df-217c408d637a"
                }
            ],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check for approved test",
                    "id": "9f4e7ad2-591a-44e0-8bb6-947faa011d75",
                    "predicate": "{\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle\"}, {\"or\": [{\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTests-PCR\"}]}, {\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTests-ANTIGEN\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}, {\"and\": [{\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check for negative test result",
                    "id": "44b93f79-adf7-4d73-8d82-4a40012aa583",
                    "predicate": "{\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle\"}, {\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.valueCodeableConcept.coding.0.code\"}, {\"var\": \"external.acceptedTestResults\"}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check that duration since test is less then predefined value",
                    "id": "80c60e79-b6e1-4d3a-9a32-c0e704e4c46a",
                    "predicate": "{\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle\"}, {\"or\": [{\"and\": [{\"or\": [{\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTests-PCR\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.effectiveDateTime\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.effectiveDateTime\"}, {\"var\": \"external.testValidityDurationHoursPCR.0\"}, \"hour\"]}]}]}, {\"and\": [{\"or\": [{\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTests-ANTIGEN\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.effectiveDateTime\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.effectiveDateTime\"}, {\"var\": \"external.testValidityDurationHoursANTIGEN.0\"}, \"hour\"]}]}]}]}, false]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "424c1058-7198-487b-a114-225638a106b9",
            "version": "1.0.0",
            "name": "SHC-VACCINATION",
            "description": "A credential issued according to the SMART Health Card specification that indicates a person's COVID-19 vaccination status.",
            "credentialSpec": "SHC",
            "credentialSpecDisplayValue": "Smart Health Card",
            "credentialCategory": "VACCINATION",
            "credentialCategoryDisplayValue": "COVID-19 Vaccination",
            "classifierRule": {
                "version": "1.0.0",
                "name": "Classifies a SHC vaccination certificate based on the value in type field.",
                "id": "b111e6a1-e9e1-4514-81b9-9be7e7c73403",
                "predicate": "{\"if\": [{\"in\": [\"https://smarthealth.cards#immunization\", {\"var\": \"payload.vc.type\"}]}, \"SHC-VACCINATION\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer, type",
                    "extract": {
                        "issuerDID": "iss",
                        "credentialType": "vc.type.2"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [
                {
                    "version": "1.0.0",
                    "name": "Display all fields - vaccination",
                    "fields": [
                        {
                            "field": "vc.credentialSubjec.fhirBundle.entry[0].name[0].text",
                            "displayValue": {
                                "en": "Full Name"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[0].resource.name[0].given",
                            "displayValue": {
                                "en": "First Name",
                                "de": "Vorname"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[0].resource.name[0].family",
                            "displayValue": {
                                "en": "Surname",
                                "de": "Nachname"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[0].resource.birthDate",
                            "displayValue": {
                                "en": "Date of Birth",
                                "de": "Geburtsdatum"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.targetDisease[0].coding[0].display",
                            "displayValue": {
                                "en": "Target Disease",
                                "de": "Zielkrankheit"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.vaccineCode.coding[0].display",
                            "displayValue": {
                                "en": "Vaccine",
                                "de": "Impfstoff"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.vaccineCode.coding[0].code",
                            "displayValue": {
                                "en": "Vaccine Code",
                                "de": "Impfcode"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.manufacturer.name",
                            "displayValue": {
                                "en": "Manufacturer",
                                "de": "Hersteller"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.occurrenceDateTime",
                            "displayValue": {
                                "en": "Vaccination Date",
                                "de": "Impfdatum"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.performer[0].actor.display",
                            "displayValue": {
                                "en": "Vaccinator",
                                "de": "Impfen"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.lotNumber",
                            "displayValue": {
                                "en": "Lot Number",
                                "de": "Lot-Nr."
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.location.address.state",
                            "displayValue": {
                                "en": "State/Province of Vaccination",
                                "de": "Staat/Bundesland der Impfung"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[1].resource.location.address.country",
                            "displayValue": {
                                "en": "Country of Vaccination",
                                "de": "Impfland"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[2].resource.targetDisease[0].coding[0].display",
                            "displayValue": {
                                "en": "Target Disease",
                                "de": "Zielkrankheit"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[2].resource.vaccineCode.coding[0].display",
                            "displayValue": {
                                "en": "Vaccine",
                                "de": "Impfstoff"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[2].resource.vaccineCode.coding[0].code",
                            "displayValue": {
                                "en": "Vaccine Code",
                                "de": "Impfcode"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[2].resource.manufacturer.name",
                            "displayValue": {
                                "en": "Manufacturer",
                                "de": "Hersteller"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[2].resource.occurrenceDateTime",
                            "displayValue": {
                                "en": "Vaccination Date",
                                "de": "Impfdatum"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[2].resource.performer[0].actor.display",
                            "displayValue": {
                                "en": "Vaccinator",
                                "de": "Impfen"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[2].resource.location.address.state",
                            "displayValue": {
                                "en": "State/Province of Vaccination",
                                "de": "Staat/Bundesland der Impfung"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[2].resource.location.address.country",
                            "displayValue": {
                                "en": "Country of Vaccination",
                                "de": "Impfland"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[3].resource.targetDisease[0].coding[0].display",
                            "displayValue": {
                                "en": "Target Disease",
                                "de": "Zielkrankheit"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[3].resource.vaccineCode.coding[0].display",
                            "displayValue": {
                                "en": "Vaccine",
                                "de": "Impfstoff"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[3].resource.vaccineCode.coding[0].code",
                            "displayValue": {
                                "en": "Vaccine Code",
                                "de": "Impfcode"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[3].resource.manufacturer.name",
                            "displayValue": {
                                "en": "Manufacturer",
                                "de": "Hersteller"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[3].resource.occurrenceDateTime",
                            "displayValue": {
                                "en": "Vaccination Date",
                                "de": "Impfdatum"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[3].resource.performer[0].actor.display",
                            "displayValue": {
                                "en": "Vaccinator",
                                "de": "Impfen"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[3].resource.location.address.state",
                            "displayValue": {
                                "en": "State/Province of Vaccination",
                                "de": "Staat/Bundesland der Impfung"
                            }
                        },
                        {
                            "field": "vc.credentialSubject.fhirBundle.entry[3].resource.location.address.country",
                            "displayValue": {
                                "en": "Country of Vaccination",
                                "de": "Impfland"
                            }
                        }
                    ],
                    "id": "1fa105d2-6a35-46c1-a42a-8fb08f76ee24"
                }
            ],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check for approved vaccine",
                    "id": "9ebbc60f-e673-4b28-9ea8-24b2ed26b96a",
                    "predicate": "{\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle\"}, {\"and\": [{\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.vaccineCode.coding.0.code\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, {\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.2.resource.vaccineCode.coding.0.code\"}, {\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.2.resource.vaccineCode.coding.0.code\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, true]}, {\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.3.resource.vaccineCode.coding.0.code\"}, {\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.3.resource.vaccineCode.coding.0.code\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, true]}, {\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.4.resource.vaccineCode.coding.0.code\"}, {\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.4.resource.vaccineCode.coding.0.code\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, true]}, {\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.5.resource.vaccineCode.coding.0.code\"}, {\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.5.resource.vaccineCode.coding.0.code\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, true]}, {\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.6.resource.vaccineCode.coding.0.code\"}, {\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.6.resource.vaccineCode.coding.0.code\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, true]}]}, false]}"
                },
                {
                    "version": "1.0.1",
                    "name": "Check that duration since getting the vaccination is in a predefined interval",
                    "id": "2638e20d-c422-4a3a-8ed4-36fc9a122142",
                    "predicate": "{\"if\": [{\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.vaccineCode.coding.0.code\"}, {\"var\": \"external.approvedVaccinesUSSingleDose\"}]}, {\"if\": [{\"!\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.2.resource.vaccineCode.coding.0.code\"}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidAfterDays.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidityDurationDays.0\"}, \"day\"]}]}, {\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.5.resource.vaccineCode.coding.0.code\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.5.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidAfterDaysBOOSTER.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.5.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidityDurationDaysBOOSTER.0\"}, \"day\"]}]}, {\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.4.resource.vaccineCode.coding.0.code\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.4.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidAfterDaysBOOSTER.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.4.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidityDurationDaysBOOSTER.0\"}, \"day\"]}]}, {\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.3.resource.vaccineCode.coding.0.code\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.3.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidAfterDaysBOOSTER.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.3.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidityDurationDaysBOOSTER.0\"}, \"day\"]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.2.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidAfterDaysBOOSTER.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.2.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidityDurationDaysBOOSTER.0\"}, \"day\"]}]}]}]}]}]}, {\"if\": [{\"in\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.vaccineCode.coding.0.code\"}, {\"var\": \"external.approvedVaccinesUSDoubleDose\"}]}, {\"if\": [{\"!\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.3.resource.vaccineCode.coding.0.code\"}]}, {\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.2.resource.vaccineCode.coding.0.code\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.2.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidAfterDays.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.2.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidityDurationDays.0\"}, \"day\"]}]}, false]}, {\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.6.resource.vaccineCode.coding.0.code\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.6.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidAfterDaysBOOSTER.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.6.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidityDurationDaysBOOSTER.0\"}, \"day\"]}]}, {\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.5.resource.vaccineCode.coding.0.code\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.5.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidAfterDaysBOOSTER.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.5.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidityDurationDaysBOOSTER.0\"}, \"day\"]}]}, {\"if\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.4.resource.vaccineCode.coding.0.code\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.4.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidAfterDaysBOOSTER.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.4.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidityDurationDaysBOOSTER.0\"}, \"day\"]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.3.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidAfterDaysBOOSTER.0\"}, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.3.resource.occurrenceDateTime\"}, {\"var\": \"external.vaccinationValidityDurationDaysBOOSTER.0\"}, \"day\"]}]}]}]}]}]}, false]}]}"
                },
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "ce524989-058a-483f-8e7f-5d264d0bdd55",
            "version": "1.0.0",
            "name": "VC-GENERIC",
            "description": "Verifiable Credential - A generic type of credential",
            "credentialSpec": "VC",
            "credentialSpecDisplayValue": "Verifiable Credential",
            "credentialCategory": "GENERIC",
            "credentialCategoryDisplayValue": "Generic Credential",
            "classifierRule": {
                "version": "1.0.1",
                "name": "Classifies a VC generic certificate based on the schema and values in type field.",
                "id": "25197aca-f96f-4eb3-a1d7-f7b9740bb6c8",
                "predicate": "{\"if\": [{\"and\": [{\"var\": \"payload.type\"}, {\"!\": [{\"in\": [\"GoodHealthPass\", {\"var\": \"payload.type\"}]}]}, {\"!\": [{\"in\": [\"IBMDigitalHealthPass\", {\"var\": \"payload.type\"}]}]}]}, \"VC-GENERIC\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer, type",
                    "extract": {
                        "issuerDID": "issuer",
                        "credentialType": "type.0"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "862ba262-1c5e-4624-ae87-7ba1bb9585c2",
            "version": "1.0.0",
            "name": "GHP-GENERIC",
            "description": "Good Health Pass - A generic type of credential",
            "credentialSpec": "GHP",
            "credentialSpecDisplayValue": "Good Health Pass",
            "credentialCategory": "GENERIC",
            "credentialCategoryDisplayValue": "Generic Credential",
            "classifierRule": {
                "version": "1.0.1",
                "name": "Classifies a GHP generic certificate based on the schema and values in type field.",
                "id": "b7537c52-028d-4ef9-80cc-b010867f000e",
                "predicate": "{\"if\": [{\"and\": [{\"var\": \"payload.type\"}, {\"in\": [\"GoodHealthPass\", {\"var\": \"payload.type\"}]}, {\"!\": [{\"in\": [\"TestCredential\", {\"var\": \"payload.type\"}]}]}, {\"!\": [{\"in\": [\"VaccinationCredential\", {\"var\": \"payload.type\"}]}]}]}, \"GHP-GENERIC\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer, type",
                    "extract": {
                        "issuerDID": "issuer",
                        "credentialType": "type.0"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        },
        {
            "id": "93c3719b-3fac-4855-bb20-ad1c1f495abe",
            "version": "1.0.0",
            "name": "IDHP-GENERIC",
            "description": "Digital Health Pass - A generic type of credential",
            "credentialSpec": "IDHP",
            "credentialSpecDisplayValue": "Digital Health Pass",
            "credentialCategory": "GENERIC",
            "credentialCategoryDisplayValue": "Generic Credential",
            "classifierRule": {
                "version": "1.0.1",
                "name": "Classifies a IDHP generic certificate based on the schema and values in type field.",
                "id": "9a717f66-2f30-41ed-a667-52916df09d44",
                "predicate": "{\"if\": [{\"and\": [{\"var\": \"payload.type\"}, {\"in\": [\"IBMDigitalHealthPass\", {\"var\": \"payload.type\"}]}, {\"!\": [{\"in\": [\"Vaccination\", {\"var\": \"payload.type\"}]}]}, {\"!\": [{\"in\": [\"Test\", {\"var\": \"payload.type\"}]}]}, {\"!\": [{\"in\": [\"Temperature\", {\"var\": \"payload.type\"}]}]}, {\"!\": [{\"in\": [\"Pass\", {\"var\": \"payload.type\"}]}]}]}, \"IDHP-GENERIC\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer, type",
                    "extract": {
                        "issuerDID": "issuer",
                        "credentialType": "type.0"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [],
            "rules": [
                {
                    "version": "1.0.0",
                    "name": "Check the credential is not expired",
                    "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                    "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, {\"===\": [{\"var\": \"external.requireExpirationDateField.0\"}, \"false\"]}]}"
                }
            ],
            "trustLists": [
                {
                    "version": "1.0.0",
                    "name": "Trust all issuers registered in the EU Gateway",
                    "items": [
                        {
                            "purpose": "",
                            "publisher": "IBM",
                            "schemas": [],
                            "issuers": []
                        }
                    ],
                    "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                }
            ]
        }
    ],
    "valueSets": [
        {
            "version": "1.0.0",
            "name": "temperatureValidityDurationHours",
            "description": "Number of hours since the temperature credential was issued within which is is valid",
            "items": [
                {
                    "value": "12",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "377b06f4-16d7-4791-b42b-ef9d0655bcf1"
        },
        {
            "version": "1.0.0",
            "name": "normalTemperatureTresholdCelsius",
            "description": "Treshold of normal temperature (C)",
            "items": [
                {
                    "value": "37.5",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "1804e710-4b1b-488d-93de-ebd750119f06"
        },
        {
            "version": "1.0.0",
            "name": "normalTemperatureTresholdFahrenheit",
            "description": "Treshold of normal temperature (F)",
            "items": [
                {
                    "value": "100.4",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "8900dd0a-ed76-4a25-9129-865ef3374e76"
        },
        {
            "version": "1.0.0",
            "name": "acceptedPassStatus",
            "description": "Accepted statuses of the issued pass credential",
            "items": [
                {
                    "value": "pass",
                    "description": ""
                }
            ],
            "maxItems": 0,
            "id": "7fc29a62-1f96-4825-90f8-29ec9addee32"
        },
        {
            "version": "1.0.0",
            "name": "passValidityDurationHours",
            "description": "Number of hours since the pass was issued within which the pass valid",
            "items": [
                {
                    "value": "24",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "bb6254a7-84f4-4ca7-9db2-9e634c56a5a0"
        },
        {
            "version": "1.0.0",
            "name": "approvedTests-ANTIGEN",
            "description": "List of LOINC codes for ANTIGEN approved tests used for test verification",
            "source": {
                "url": "https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1114.9?_format=json",
                "documentation": "https://vsac.nlm.nih.gov/valueset/2.16.840.1.113762.1.4.1114.9/expansion",
                "sourceType": "json",
                "comments": "ANTIGEN test LOINC codes retrieved from source (filtered using description)",
                "queries": [
                    {
                        "queryTool": "jmespath",
                        "expression": "compose.include[0].concept[?contains(display, 'Immunoassay') || contains(display, 'immunoassay') || contains(display, ' Ab ')].code"
                    },
                    {
                        "queryTool": "jq",
                        "expression": "[.compose.include[0].concept[] | select (.display | ascii_downcase | contains(\"immunoassay\") or contains(\" ab \")) | {\"value\": .code, \"description\": .display}]"
                    },
                    {
                        "queryTool": "jsonpath",
                        "expression": ""
                    }
                ]
            },
            "items": [
                {
                    "value": "94503-0",
                    "description": "SARS-CoV-2 (COVID-19) Ab panel - Serum, Plasma or Blood by Rapid immunoassay"
                },
                {
                    "value": "94504-8",
                    "description": "SARS-CoV-2 (COVID-19) Ab panel - Serum or Plasma by Immunoassay"
                },
                {
                    "value": "94507-1",
                    "description": "SARS-CoV-2 (COVID-19) IgG Ab [Presence] in Serum, Plasma or Blood by Rapid immunoassay"
                },
                {
                    "value": "94508-9",
                    "description": "SARS-CoV-2 (COVID-19) IgM Ab [Presence] in Serum, Plasma or Blood by Rapid immunoassay"
                },
                {
                    "value": "94547-7",
                    "description": "SARS-CoV-2 (COVID-19) IgG+IgM Ab [Presence] in Serum or Plasma by Immunoassay"
                },
                {
                    "value": "94558-4",
                    "description": "SARS-CoV-2 (COVID-19) Ag [Presence] in Respiratory specimen by Rapid immunoassay"
                },
                {
                    "value": "94562-6",
                    "description": "SARS-CoV-2 (COVID-19) IgA Ab [Presence] in Serum or Plasma by Immunoassay"
                },
                {
                    "value": "94563-4",
                    "description": "SARS-CoV-2 (COVID-19) IgG Ab [Presence] in Serum or Plasma by Immunoassay"
                },
                {
                    "value": "94564-2",
                    "description": "SARS-CoV-2 (COVID-19) IgM Ab [Presence] in Serum or Plasma by Immunoassay"
                },
                {
                    "value": "94661-6",
                    "description": "SARS-CoV-2 (COVID-19) Ab [Interpretation] in Serum or Plasma"
                },
                {
                    "value": "94761-4",
                    "description": "SARS-CoV-2 (COVID-19) IgG Ab [Presence] in DBS by Immunoassay"
                },
                {
                    "value": "94762-2",
                    "description": "SARS-CoV-2 (COVID-19) Ab [Presence] in Serum or Plasma by Immunoassay"
                },
                {
                    "value": "95209-3",
                    "description": "SARS-CoV+SARS-CoV-2 (COVID-19) Ag [Presence] in Respiratory specimen by Rapid immunoassay"
                },
                {
                    "value": "95416-4",
                    "description": "SARS-CoV-2 (COVID-19) IgM Ab [Presence] in DBS by Immunoassay"
                },
                {
                    "value": "95542-7",
                    "description": "SARS-CoV-2 (COVID-19) IgG+IgM Ab [Presence] in Serum, Plasma or Blood by Rapid immunoassay"
                }
            ],
            "maxItems": 0,
            "id": "3f5c62ec-3b52-426f-815f-cc087c4e99e2"
        },
        {
            "version": "1.0.0",
            "name": "approvedVaccinesUS",
            "description": "List of CDC CVX codes for approved vaccines used for vaccination verification",
            "source": {
                "url": "https://www2a.cdc.gov/vaccines/iis/iisstandards/XML2.asp?rpt=cvx",
                "documentation": "https://www.cdc.gov/vaccines/programs/iis/COVID-19-related-codes.html",
                "sourceType": "xml",
                "comments": "Vaccine codes retrieved from source which have 'COVID-19' in ShortDescription field and with 'Active' or 'Non-Us' in Status field and does not have 'not counted toward  immunity in US' in Notes field and code not equal to 500",
                "queries": [
                    {
                        "queryTool": "xpath",
                        "expression": "/CVXCodes/CVXInfo[contains(ShortDescription/text(), 'COVID-19') and (Status='Active' or Status='Non-US') and not(contains(normalize-space(Notes/text()), 'not counted toward immunity in US')) and normalize-space(CVXCode/text()) != '500']/CVXCode/text()"
                    },
                    {
                        "queryTool": "lxml",
                        "expression": ""
                    }
                ]
            },
            "items": [
                {
                    "value": "207",
                    "description": "Spikevax (Moderna)"
                },
                {
                    "value": "208",
                    "description": "Comirnaty (Pfizer-BioNTech)"
                },
                {
                    "value": "210",
                    "description": "Vaxzevria (AstraZeneca)"
                },
                {
                    "value": "212",
                    "description": "Janssen"
                },
                {
                    "value": "217",
                    "description": "Comirnaty (Pfizer-BioNTech) 12 to 18 years"
                },
                {
                    "value": "218",
                    "description": "Comirnaty (Pfizer-BioNTech) 5 to 12 years"
                },
                {
                    "value": "219",
                    "description": "Comirnaty (Pfizer-BioNTech) 6 months to 5 years"
                },
                {
                    "value": "502",
                    "description": "Covaxin (Bharat Biotech)"
                },
                {
                    "value": "510",
                    "description": "Covilo/BIBP (Sinopharm)"
                },
                {
                    "value": "511",
                    "description": "CoronaVac (Sinovac)"
                }
            ],
            "maxItems": 0,
            "id": "1a7e7f2d-cc6b-4c21-91e7-05e2f04c90e9"
        },
        {
            "version": "1.0.0",
            "name": "approvedVaccinesUSSingleDose",
            "description": "List of CDC CVX codes for approved SINGLE DOSE vaccines used for vaccination verification",
            "source": {
                "url": "https://www2a.cdc.gov/vaccines/iis/iisstandards/XML2.asp?rpt=cvx",
                "documentation": "https://www.cdc.gov/vaccines/programs/iis/COVID-19-related-codes.html",
                "sourceType": "xml",
                "comments": "Vaccine codes retrieved from source which have 'COVID-19' in ShortDescription field and with 'Active' or 'Non-Us' in Status field and does not have 'not counted toward immunity in US' in Notes field and contain '1-dose vaccine' in Notes field and code not equal to 500",
                "queries": [
                    {
                        "queryTool": "xpath",
                        "expression": "/CVXCodes/CVXInfo[contains(ShortDescription/text(), 'COVID-19') and (Status='Active' or Status='Non-US') and not(contains(normalize-space(Notes/text()), 'not counted toward immunity in US')) and contains(Notes/text(), '1-dose vaccine') and normalize-space(CVXCode/text()) != '500']/CVXCode/text()"
                    },
                    {
                        "queryTool": "lxml",
                        "expression": ""
                    }
                ]
            },
            "items": [
                {
                    "value": "212",
                    "description": "Janssen"
                }
            ],
            "maxItems": 0,
            "id": "34c6b294-0028-4c7f-9827-995d22f245b0"
        },
        {
            "version": "1.0.0",
            "name": "approvedTests-PCR",
            "description": "List of LOINC codes for PCR approved tests used for test verification",
            "source": {
                "url": "https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1114.9?_format=json",
                "documentation": "https://vsac.nlm.nih.gov/valueset/2.16.840.1.113762.1.4.1114.9/expansion",
                "sourceType": "json",
                "comments": "PCR test LOINC codes retrieved from source (filtered using description)",
                "queries": [
                    {
                        "queryTool": "jmespath",
                        "expression": "compose.include[0].concept[?contains(display, 'NAA') || contains(display, 'Nucleic acid amplification') || contains(display, 'Sequencing')].code"
                    },
                    {
                        "queryTool": "jq",
                        "expression": "[.compose.include[0].concept[] | select (.display | ascii_downcase | contains(\"naa\") or contains(\"nucleic acid amplification\") or contains(\"sequencing\")) | {\"value\": .code, \"description\": .display}]"
                    },
                    {
                        "queryTool": "jsonpath",
                        "expression": ""
                    }
                ]
            },
            "items": [
                {
                    "value": "50548-7",
                    "description": "Respiratory virus DNA+RNA [Identifier] in Unspecified specimen by NAA with probe detection"
                },
                {
                    "value": "68993-5",
                    "description": "Human RNase P RNA [Presence] in Unspecified specimen by NAA with probe detection"
                },
                {
                    "value": "82159-5",
                    "description": "Respiratory pathogens DNA and RNA panel - Nasopharynx by NAA with non-probe detection"
                },
                {
                    "value": "94306-8",
                    "description": "SARS-CoV-2 (COVID-19) RNA panel - Unspecified specimen by NAA with probe detection"
                },
                {
                    "value": "94307-6",
                    "description": "SARS-CoV-2 (COVID-19) N gene [Presence] in Unspecified specimen by Nucleic acid amplification using CDC primer-probe set N1"
                },
                {
                    "value": "94308-4",
                    "description": "SARS-CoV-2 (COVID-19) N gene [Presence] in Unspecified specimen by Nucleic acid amplification using CDC primer-probe set N2"
                },
                {
                    "value": "94309-2",
                    "description": "SARS-CoV-2 (COVID-19) RNA [Presence] in Unspecified specimen by NAA with probe detection"
                },
                {
                    "value": "94500-6",
                    "description": "SARS-CoV-2 (COVID-19) RNA [Presence] in Respiratory specimen by NAA with probe detection"
                },
                {
                    "value": "94502-2",
                    "description": "SARS-related coronavirus RNA [Presence] in Respiratory specimen by NAA with probe detection"
                },
                {
                    "value": "94531-1",
                    "description": "SARS-CoV-2 (COVID-19) RNA panel - Respiratory specimen by NAA with probe detection"
                },
                {
                    "value": "94533-7",
                    "description": "SARS-CoV-2 (COVID-19) N gene [Presence] in Respiratory specimen by NAA with probe detection"
                },
                {
                    "value": "94534-5",
                    "description": "SARS-CoV-2 (COVID-19) RdRp gene [Presence] in Respiratory specimen by NAA with probe detection"
                },
                {
                    "value": "94559-2",
                    "description": "SARS-CoV-2 (COVID-19) ORF1ab region [Presence] in Respiratory specimen by NAA with probe detection"
                },
                {
                    "value": "94565-9",
                    "description": "SARS-CoV-2 (COVID-19) RNA [Presence] in Nasopharynx by NAA with non-probe detection"
                },
                {
                    "value": "94640-0",
                    "description": "SARS-CoV-2 (COVID-19) S gene [Presence] in Respiratory specimen by NAA with probe detection"
                },
                {
                    "value": "94756-4",
                    "description": "SARS-CoV-2 (COVID-19) N gene [Presence] in Respiratory specimen by Nucleic acid amplification using CDC primer-probe set N1"
                },
                {
                    "value": "94757-2",
                    "description": "SARS-CoV-2 (COVID-19) N gene [Presence] in Respiratory specimen by Nucleic acid amplification using CDC primer-probe set N2"
                },
                {
                    "value": "94758-0",
                    "description": "SARS-related coronavirus E gene [Presence] in Respiratory specimen by NAA with probe detection"
                },
                {
                    "value": "94759-8",
                    "description": "SARS-CoV-2 (COVID-19) RNA [Presence] in Nasopharynx by NAA with probe detection"
                },
                {
                    "value": "94760-6",
                    "description": "SARS-CoV-2 (COVID-19) N gene [Presence] in Nasopharynx by NAA with probe detection"
                },
                {
                    "value": "94764-8",
                    "description": "SARS-CoV-2 (COVID-19) whole genome [Nucleotide sequence] in Isolate by Sequencing"
                },
                {
                    "value": "94845-5",
                    "description": "SARS-CoV-2 (COVID-19) RNA [Presence] in Saliva (oral fluid) by NAA with probe detection"
                },
                {
                    "value": "95406-5",
                    "description": "SARS-CoV-2 (COVID-19) RNA [Presence] in Nose by NAA with probe detection"
                },
                {
                    "value": "95409-9",
                    "description": "SARS-CoV-2 (COVID-19) N gene [Presence] in Nose by NAA with probe detection"
                },
                {
                    "value": "95423-0",
                    "description": "Influenza virus A and B and SARS-CoV-2 (COVID-19) identified in Respiratory specimen by NAA with probe detection"
                },
                {
                    "value": "95424-8",
                    "description": "SARS-CoV-2 (COVID-19) RNA [Presence] in Respiratory specimen by Sequencing"
                },
                {
                    "value": "95425-5",
                    "description": "SARS-CoV-2 (COVID-19) N gene [Presence] in Saliva (oral fluid) by NAA with probe detection"
                },
                {
                    "value": "95608-6",
                    "description": "SARS-CoV-2 (COVID-19) RNA [Presence] in Respiratory specimen by NAA with non-probe detection"
                },
                {
                    "value": "95609-4",
                    "description": "SARS-CoV-2 (COVID-19) S gene [Presence] in Respiratory specimen by Sequencing"
                }
            ],
            "maxItems": 0,
            "id": "d079dfb8-bdb5-4613-88e9-e1d15b851340"
        },
        {
            "version": "1.0.0",
            "name": "approvedVaccinesUSDoubleDose",
            "description": "List of CDC CVX codes for approved DOUBLE DOSE vaccines used for vaccination verification",
            "source": {
                "url": "https://www2a.cdc.gov/vaccines/iis/iisstandards/XML2.asp?rpt=cvx",
                "documentation": "https://www.cdc.gov/vaccines/programs/iis/COVID-19-related-codes.html",
                "sourceType": "xml",
                "comments": "Vaccine codes retrieved from source which have 'COVID-19' in ShortDescription field and with 'Active' or 'Non-Us' in Status field and does not have 'not counted toward immunity in US' in Notes field and does not contain '1-dose vaccine' in Notes field and code not equal to 500",
                "queries": [
                    {
                        "queryTool": "xpath",
                        "expression": "/CVXCodes/CVXInfo[contains(ShortDescription/text(), 'COVID-19') and (Status='Active' or Status='Non-US') and not(contains(normalize-space(Notes/text()), 'not counted toward immunity in US')) and not(contains(Notes/text(), '1-dose vaccine')) and normalize-space(CVXCode/text()) != '500']/CVXCode/text()"
                    },
                    {
                        "queryTool": "lxml",
                        "expression": ""
                    }
                ]
            },
            "items": [
                {
                    "value": "207",
                    "description": "Spikevax (Moderna)"
                },
                {
                    "value": "208",
                    "description": "Comirnaty (Pfizer-BioNTech)"
                },
                {
                    "value": "210",
                    "description": "Vaxzevria (AstraZeneca)"
                },
                {
                    "value": "217",
                    "description": "Comirnaty (Pfizer-BioNTech) 12 to 18 years"
                },
                {
                    "value": "218",
                    "description": "Comirnaty (Pfizer-BioNTech) 5 to 12 years"
                },
                {
                    "value": "219",
                    "description": "Comirnaty (Pfizer-BioNTech) 6 months to 5 years"
                },
                {
                    "value": "502",
                    "description": "Covaxin (Bharat Biotech)"
                },
                {
                    "value": "510",
                    "description": "Covilo/BIBP (Sinopharm)"
                },
                {
                    "value": "511",
                    "description": "CoronaVac (Sinovac)"
                }
            ],
            "maxItems": 0,
            "id": "f9014c95-2352-4a9f-ad31-6dab36bd030a"
        },
        {
            "version": "1.0.0",
            "name": "requireBooster",
            "description": "Indication whether a vaccination credential is checked for booster. Only booster vaccination is accepted if set to 'true'.",
            "items": [
                {
                    "value": "true",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "8fee1e9c-cb47-441a-97a0-d06f25748982"
        },
        {
            "version": "1.0.0",
            "name": "vaccinationValidAfterDaysBOOSTER",
            "description": "Number of days since the vaccination after which the vaccination is valid",
            "items": [
                {
                    "value": "0",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "1d573eb1-2e7a-4ebd-9656-145ee40f3df2"
        },
        {
            "version": "1.0.0",
            "name": "testValidityDurationHoursPCR",
            "description": "Number of hours since the PCR test within which the test result is valid",
            "items": [
                {
                    "value": "72",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "2f9a57d3-a549-4f4e-aca3-27d81741a2bc"
        },
        {
            "version": "1.0.0",
            "name": "vaccinationValidityDurationDays",
            "description": "The duration of the vaccination validity in days",
            "items": [
                {
                    "value": "270",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "1539d577-29b9-4dc1-817d-280df00872b8"
        },
        {
            "version": "1.0.0",
            "name": "acceptedTestResults",
            "description": "List of SNOMED codes for accepted test results indicating a negative COVID-19 test (virus not found)",
            "items": [
                {
                    "value": "Not detected",
                    "description": "Not detected"
                },
                {
                    "value": "260415000",
                    "description": "Not detected"
                }
            ],
            "maxItems": 0,
            "id": "6d51877c-454e-4304-83d1-a4c360e3b412"
        },
        {
            "version": "1.0.0",
            "name": "vaccinationValidityDurationDaysBOOSTER",
            "description": "The duration of the vaccination validity in days",
            "items": [
                {
                    "value": "999",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "47bdcc2d-349e-4798-8c9a-a316397cd1ab"
        },
        {
            "version": "1.0.0",
            "name": "vaccinationValidAfterDays",
            "description": "Number of days since the vaccination after which the vaccination is valid",
            "items": [
                {
                    "value": "14",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "f9658430-b373-402a-be4a-d1259eea69cf"
        },
        {
            "version": "1.0.0",
            "name": "testValidityDurationHoursANTIGEN",
            "description": "Number of hours since the ANTIGEN test within which the test result is valid",
            "items": [
                {
                    "value": "48",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "0ba0316f-17d4-4c5d-8b3f-0fb2bccc5a42"
        },
        {
            "version": "1.0.0",
            "name": "approvedTestMethods-PCR",
            "description": "List of PRC LOINC codes for approved PCR test methods used for test verification",
            "source": {
                "url": "",
                "documentation": "https://covid-19-diagnostics.jrc.ec.europa.eu/devices?manufacturer&text_name&marking&rapid_diag&format&target_type&field-1=HSC%20common%20list%20%28RAT%29&value-1=1&search_method=AND#form_content",
                "sourceType": "",
                "comments": "",
                "queries": []
            },
            "items": [
                {
                    "value": "LP6464-4",
                    "description": "Nucleic acid amplification with probe detection"
                }
            ],
            "maxItems": 0,
            "id": "c5211393-646a-496d-a981-1127b1e4f02b"
        },
        {
            "version": "1.0.0",
            "name": "approvedDiseases",
            "description": "List of SNOMED codes for approved diseases or agents indicating COVID-19 (for purpose of recovery certificate verification)",
            "items": [
                {
                    "value": "840539006",
                    "description": "Disease caused by 2019 novel coronavirus"
                }
            ],
            "maxItems": 0,
            "id": "f3d46ce9-acfe-491e-8f1a-65cf50a87e32"
        },
        {
            "version": "1.0.0",
            "name": "approvedTestMethods-ANTIGEN",
            "description": "List of LOINC codes for approved ANTIGEN test methods used for test verification",
            "source": {
                "url": "",
                "documentation": "https://covid-19-diagnostics.jrc.ec.europa.eu/devices?manufacturer&text_name&marking&rapid_diag&format&target_type&field-1=HSC%20common%20list%20%28RAT%29&value-1=1&search_method=AND#form_content",
                "sourceType": "",
                "comments": "",
                "queries": []
            },
            "items": [
                {
                    "value": "LP217198-3",
                    "description": "Rapid immunoassay"
                }
            ],
            "maxItems": 0,
            "id": "90fc8d33-dbec-4588-9844-67a3fe9f3380"
        },
        {
            "version": "1.0.0",
            "name": "approvedVaccinesEU",
            "description": "List of EU issued license numbers for approved vaccines used for vaccination verification",
            "source": {
                "url": "https://ec.europa.eu/health/documents/community-register/ods/ods_products.json",
                "documentation": "https://www.ema.europa.eu/en/human-regulatory/overview/public-health-threats/coronavirus-disease-covid-19/treatments-vaccines/vaccines-covid-19/covid-19-vaccines-authorised",
                "sourceType": "json",
                "comments": "",
                "queries": [
                    {
                        "queryTool": "jsonpath",
                        "expression": ""
                    }
                ]
            },
            "items": [
                {
                    "value": "EU/1/20/1528",
                    "description": "Comirnaty (Pfizer-BioNTech)"
                },
                {
                    "value": "EU/1/20/1507",
                    "description": "Spikevax (Moderna)"
                },
                {
                    "value": "EU/1/21/1529",
                    "description": "Vaxzevria (AstraZeneca)"
                },
                {
                    "value": "EU/1/20/1525",
                    "description": "Janssen"
                },
                {
                    "value": "EU/1/21/1618",
                    "description": "Nuvaxovid (Novavax)"
                }
            ],
            "maxItems": 0,
            "id": "e3307d04-152f-4cd8-b4c9-6d4a5d5d1c53"
        },
        {
            "version": "1.0.0",
            "name": "requireExpirationDateField",
            "description": "Indication whether expirationDate field is required. If set to 'true' and the field is not in credential then rule that checks the filed value returns FALSE.",
            "items": [
                {
                    "value": "false",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "8cee293e-afce-4a76-a3d8-b92f86ee968c"
        },
        {
            "version": "1.0.0",
            "name": "acceptTestMethodAsTestType",
            "description": "Indication whether a test method (PCR or ANTIGEN) is accepted as test type. Only individual test codes are accepted if set to 'false'.",
            "items": [
                {
                    "value": "true",
                    "description": ""
                }
            ],
            "maxItems": 1,
            "id": "6e4e760a-f9b4-491c-91ed-dbaa026c1031"
        }
    ],
    "disabledSpecifications": [],
    "disabledRules": [
        {
            "id": "07dd8678-eacf-4002-8ca7-92f157697088",
            "specID": "62ebbb00-9ca7-4a40-a4df-6a64d4cc6a45"
        },
        {
            "id": "d8d8cb83-fce5-4722-98a2-3b0edc6d314e",
            "specID": "62ebbb00-9ca7-4a40-a4df-6a64d4cc6a45"
        },
        {
            "id": "afbc7321-c7d5-4fe1-ab83-cc04e90022fb",
            "specID": "62ebbb00-9ca7-4a40-a4df-6a64d4cc6a45"
        },
        {
            "id": "5ebca7a3-e99a-40fb-b61f-bca9576a77c0",
            "specID": "62ebbb00-9ca7-4a40-a4df-6a64d4cc6a45"
        },
        {
            "id": "61a3bbfb-422d-40d0-a5a6-56f6cba003cb",
            "specID": "528a4c41-ef92-4ac4-be72-3f3fc3260f3c"
        },
        {
            "id": "fb830f1f-9844-49a1-9820-d043409abecb",
            "specID": "528a4c41-ef92-4ac4-be72-3f3fc3260f3c"
        },
        {
            "id": "8a2cf6ef-f44d-4f5c-8448-3262d983e865",
            "specID": "528a4c41-ef92-4ac4-be72-3f3fc3260f3c"
        },
        {
            "id": "90ec030b-aa1e-48b0-9919-0a593e22e1ed",
            "specID": "528a4c41-ef92-4ac4-be72-3f3fc3260f3c"
        },
        {
            "id": "4d8cbbe4-059a-406b-9b72-13164aa46c27",
            "specID": "76154d1a-c769-4c4f-9b2c-a383007190b4"
        },
        {
            "id": "eab75840-3896-4377-8237-35b9e079a907",
            "specID": "76154d1a-c769-4c4f-9b2c-a383007190b4"
        },
        {
            "id": "f6f81718-f4ff-4e6d-88b9-202db5da5c46",
            "specID": "76154d1a-c769-4c4f-9b2c-a383007190b4"
        },
        {
            "id": "0464bfe4-97df-422c-9ef8-3b10ea4c69f6",
            "specID": "dd150cae-b567-4ce6-8525-cceaea07334b"
        },
        {
            "id": "dbfb7694-fe3f-4cfb-92bd-76b1c2195f0a",
            "specID": "dd150cae-b567-4ce6-8525-cceaea07334b"
        },
        {
            "id": "e6749362-0ae3-4f01-a0e3-e44799e37e4b",
            "specID": "dd150cae-b567-4ce6-8525-cceaea07334b"
        },
        {
            "id": "3b317598-eef1-4573-9638-6a2482d48d17",
            "specID": "e158320f-9333-4a21-8d3f-1c4a6519b55d"
        },
        {
            "id": "57327cbe-f9f8-4e86-b565-4138c1949d6c",
            "specID": "e158320f-9333-4a21-8d3f-1c4a6519b55d"
        },
        {
            "id": "a0295a42-fac0-489a-90bd-d07f9e70b481",
            "specID": "e158320f-9333-4a21-8d3f-1c4a6519b55d"
        },
        {
            "id": "0464bfe4-97df-422c-9ef8-3b10ea4c69f6",
            "specID": "9a9f92f9-9c05-4957-bc7c-de6e20966000"
        },
        {
            "id": "dbfb7694-fe3f-4cfb-92bd-76b1c2195f0a",
            "specID": "9a9f92f9-9c05-4957-bc7c-de6e20966000"
        },
        {
            "id": "e6749362-0ae3-4f01-a0e3-e44799e37e4b",
            "specID": "9a9f92f9-9c05-4957-bc7c-de6e20966000"
        },
        {
            "id": "3b317598-eef1-4573-9638-6a2482d48d17",
            "specID": "52dba9c4-301b-4b52-970f-2f47b7d0480b"
        },
        {
            "id": "57327cbe-f9f8-4e86-b565-4138c1949d6c",
            "specID": "52dba9c4-301b-4b52-970f-2f47b7d0480b"
        },
        {
            "id": "a0295a42-fac0-489a-90bd-d07f9e70b481",
            "specID": "52dba9c4-301b-4b52-970f-2f47b7d0480b"
        },
        {
            "id": "3fd0d331-9a67-46f5-8f1e-738535450352",
            "specID": "00308a43-98ee-464f-8ae9-0caa8b62766d"
        },
        {
            "id": "4b880223-815f-4bdd-bf74-c3e8e97bf70f",
            "specID": "00308a43-98ee-464f-8ae9-0caa8b62766d"
        },
        {
            "id": "4f4fb938-0633-4af0-8c64-a785dc8f8a04",
            "specID": "a4d9eeec-9d51-46a0-90fa-947240798a8e"
        },
        {
            "id": "75916ba4-16ec-48cc-b8c1-d808e269823e",
            "specID": "a4d9eeec-9d51-46a0-90fa-947240798a8e"
        },
        {
            "id": "9f4e7ad2-591a-44e0-8bb6-947faa011d75",
            "specID": "0df225f1-93e4-45b1-8f8e-e452d1f1be81"
        },
        {
            "id": "44b93f79-adf7-4d73-8d82-4a40012aa583",
            "specID": "0df225f1-93e4-45b1-8f8e-e452d1f1be81"
        },
        {
            "id": "80c60e79-b6e1-4d3a-9a32-c0e704e4c46a",
            "specID": "0df225f1-93e4-45b1-8f8e-e452d1f1be81"
        },
        {
            "id": "9ebbc60f-e673-4b28-9ea8-24b2ed26b96a",
            "specID": "424c1058-7198-487b-a114-225638a106b9"
        },
        {
            "id": "2638e20d-c422-4a3a-8ed4-36fc9a122142",
            "specID": "424c1058-7198-487b-a114-225638a106b9"
        }
    ]
}


module.exports = {
    verifierConfigContent
}