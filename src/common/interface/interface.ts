export interface Guardian {
    name: string;
    occupation: string;
    addressLineOne: string,
    addressLineTwo: string,
    street: string,
    district: string,
    pincode: string,
    relationship: string;
    monthlyIncome: string;
    phoneNumber: string;
}

export interface Marks {
    english: string,
    language: string;
    hindi: string,
    science: string;
    physics: string,
    chemistry: string,
    computerScience: string,
    mathematics: string,
    firstLanguagePaperOne: string,
    firstLanguagePaperTwo: string,
    socialScience: string,
    biology: string,
    informationTechnology: string,
    communicativeEnglish: string,
}

export interface Application {
    category: string;
    title:string;
    preferenceOne: string;
    preferenceTwo: string;
    preferenceThree: string;
    preferenceFour: string;
    preferenceFive: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string | null;
    placeOfBirth: string;
    gender: string;
    religion: string;
    aadhaarNo: string;
    addressLine1: string;
    addressLine2: string;
    street: string;
    district: string;
    pinCode: string;
    contactNo: string;
    alternateContactNo: string;
    course: string; // HSE, SSLC, CBSE, etc.
    board: string; // HSE, CBSE, etc.
    institution: string,
    universityOrBoard: string,
    passedOn: string,
    marks: Marks; // Store marks for each subject
    guardian: Guardian;
    declarationAccepted: boolean; // Checkbox for declaration
}
