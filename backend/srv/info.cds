using btptour.core as core from '../db/index';

service InfoService {
    @odata.singleton
    @readonly
    entity UserInfo {
        key Username : String;
            Details  : String;
    }

    // Expose patient data via service
    entity PERSONS as projection on core.PERSONS;

    // Annotate how to search patients by name
    annotate PERSONS with {
        @Search.defaultSearchElement : true
        @Search.fuzzinessThreshold   : 0.8
        LAST;
        FIRST;
    }

    // Annotate that patient data represents natural persons
    annotate PERSONS with @(Common.IsNaturalPerson, );

    // Annotate how Fiori app shall display patients
    annotate PERSONS with @(
        Capabilities : {SearchRestrictions : {Searchable : true}},
        UI           : {
            SelectionFields          : [],
            PresentationVariant      : {
                SortOrder      : [{
                    Property   : LAST,
                    Descending : false
                }],
                Visualizations : ['@UI.LineItem']
            },
            HeaderInfo               : {
                TypeName       : '{i18n>PERSONS.PATIENT}',
                TypeNamePlural : '{i18n>PERSONS.PERSONS}',
                Title          : {
                    Value : LAST,
                    Label : '{i18n>PERSONS.LAST}',
                },
                Description    : {
                    Value : BIRTHDATE,
                    Label : '{i18n>PERSONS.BIRTHDATE}'
                }

            },
            LineItem                 : [
                {
                    Label : '{i18n>PERSONS.FIRST}',
                    Value : FIRST
                },
                {
                    Label : '{i18n>PERSONS.LAST}',
                    Value : LAST
                },
                {
                    Label : '{i18n>PERSONS.BIRTHDATE}',
                    Value : BIRTHDATE
                },
                {
                    Label : '{i18n>PERSONS.GENDER}',
                    Value : GENDER
                },
                {
                    Label : '{i18n>PERSONS.ADDRESS}',
                    Value : ADDRESS
                },
                {
                    Label : '{i18n>PERSONS.CITY}',
                    Value : CITY
                },
                {
                    Label : '{i18n>PERSONS.STATE}',
                    Value : STATE
                }
            ],
            FieldGroup #PersonalData : {Data : [
                {
                    Label : '{i18n>PERSONS.FIRST}',
                    Value : FIRST
                },
                {
                    Label : '{i18n>PERSONS.LAST}',
                    Value : LAST
                },
                {
                    Label : '{i18n>PERSONS.MAIDEN}',
                    Value : MAIDEN
                },
                {
                    Label : '{i18n>PERSONS.BIRTHDATE}',
                    Value : BIRTHDATE
                },
                {
                    Label : '{i18n>PERSONS.BIRTHPLACE}',
                    Value : BIRTHPLACE
                },
                {
                    Label : '{i18n>PERSONS.DEATHDATE}',
                    Value : DEATHDATE
                }
            ]},
            FieldGroup #TraitsData   : {Data : [
                {
                    Label : '{i18n>PERSONS.GENDER}',
                    Value : GENDER
                },
                {
                    Label : '{i18n>PERSONS.RACE}',
                    Value : RACE
                },
                {
                    Label : '{i18n>PERSONS.ETHNICITY}',
                    Value : ETHNICITY
                }
            ]},
            FieldGroup #AddressData  : {Data : [
                {
                    Label : '{i18n>PERSONS.ADDRESS}',
                    Value : ADDRESS
                },
                {
                    Label : '{i18n>PERSONS.CITY}',
                    Value : CITY
                },
                {
                    Label : '{i18n>PERSONS.STATE}',
                    Value : STATE
                },
                {
                    Label : '{i18n>PERSONS.COUNTY}',
                    Value : COUNTY
                },
                {
                    Label : '{i18n>PERSONS.ZIP}',
                    Value : ZIP
                },
                {
                    Label : '{i18n>PERSONS.LAT}',
                    Value : LAT
                },
                {
                    Label : '{i18n>PERSONS.LON}',
                    Value : LON
                }
            ]},
            Facets                   : [
                {
                    $Type  : 'UI.CollectionFacet',
                    Label  : '{i18n>PERSONS.PERSONINFO}',
                    Facets : [
                        {
                            $Type  : 'UI.ReferenceFacet',
                            Label  : '{i18n>PERSONS.PERSONALDATA}',
                            Target : '@UI.FieldGroup#PersonalData',
                        },
                        {
                            $Type  : 'UI.ReferenceFacet',
                            Label  : '{i18n>PERSONS.TRAITSDATA}',
                            Target : '@UI.FieldGroup#TraitsData',
                        },
                        {
                            $Type  : 'UI.ReferenceFacet',
                            Label  : '{i18n>PERSONS.ADDRESSDATA}',
                            Target : '@UI.FieldGroup#AddressData',
                        }
                    ]
                }
            ]
        }
    );
}

//annotate InfoService with @(requires : 'authenticated-user');
