namespace btptour.core;

entity PERSONS {
	key Id: UUID;
	BIRTHDATE: Date;
	DEATHDATE: Date;
	SSN: String;
	DRIVERS: String;
	PASSPORT: String;
	PREFIX: String;
	FIRST: String;
	LAST: String;
	SUFFIX: String;
	MAIDEN: String;
	MARITAL: String;
	RACE: String;
	ETHNICITY: String;
	GENDER: String;
	BIRTHPLACE: String;
	ADDRESS: String;
	CITY: String;
	STATE: String;
	COUNTY: String;
	ZIP: Integer64;
	LAT: Decimal;
	LON: Decimal;
}
