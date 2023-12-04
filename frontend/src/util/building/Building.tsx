export interface Building {
    code: string;
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
}

export const BUILDINGS : {[buildingName: string] : Building} = {
    SCIENCE_WING: {code: "SW", name: "Science Wing", location: {latitude: 43.783412263866765, longitude: -79.18798282511081}},
    HUMANITIES_WING: {code: "HW", name: "Humanities Wing", location: {latitude: 43.78315068397239, longitude: -79.18703884105001}},
    HIGHLAND_HALL: {code: "HL", name: "Highland Hall", location: {latitude: 43.784755377531084, longitude: -79.18563910859574}},
    ACADEMIC_RESOURCE: {code: "AC", name: "Academic Resource Center", location: {latitude: 43.7838352380113, longitude: -79.18602223999463}},
    BLADEN_WING: {code: "BV", name: "Bladen Wing", location: {latitude: 43.78430079076248, longitude: -79.18693743368625}},
    ARTS_ADMINISTRATION: {code: "AA", name: "Arts & Administration", location: {latitude: 43.78460051118691, longitude: -79.18786891439241}},
    STUDENT_CENTRE: {code: "SL", name: "Student Centre", location: {latitude: 43.78516823087367, longitude: -79.18697865296404}},
    SCIENCE_RESEARCH: {code: "SY", name: "Science Research", location: {latitude: 43.78410967922719, longitude: -79.18944401519595}},
    SOCIAL_SCIENCES: {code: "MW", name: "Social Sciences", location: {latitude: 43.78284644734828, longitude: -79.18602308428763}},
    SOUTH_RESIDENCES: {code: "", name: "South Residences", location: {latitude: 43.78311423554599, longitude: -79.18408735198413}},
    NORTH_RESIDENCES: {code: "", name: "North Residences", location: {latitude: 43.78525042826337, longitude: -79.18929315867295}},
    HARMONY_COMMONS: {code: "", name: "Harmony Commons", location: {latitude: 43.78724014057881, longitude: -79.18780947129625}},
    INSTRUCTIONAL_CENTRE: {code: "IC", name: "Instructional Centre", location: {latitude: 43.78678842588775, longitude: -79.1897199690986}},
    ENVIRONMENTAL_CHEMISTRY: {code: "EV", name: "Environmental Science and Chemistry", location: {latitude: 43.78729278271081, longitude: -79.19039463676108}},
    PAN_AM: {code: "TPASC", name: "Pan Am Sports Center", location: {latitude: 43.790627359386, longitude: -79.1936823766945}},
}