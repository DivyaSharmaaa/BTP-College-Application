namespace db ;

entity Department {
    key uuid : UUID;
    key DepartmentID   : String default '' @readonly;
        DepartmentName : String;
        deptToStudent  : Composition of many Student on deptToStudent.studToDepartment = $self;
        deptToTeacher : Composition of many TeacherDetails on deptToTeacher.teachToDept = $self;
}

entity Student {
    key suuid : UUID;
    key StudentID        : String default '' @readonly;
        DepartmentID     : String;
        Name             : String;
        PhoneNumber      : String;
        Email            : String;
        Address          : String;
        studToDepartment : Association to one Department on studToDepartment.DepartmentID = DepartmentID;
}

entity Teacher {
    key ttuuid : UUID;
     TeacherID    : String default '' @readonly;
        Name         : String;
        PhoneNumber  : String;
        Email        : String;
        Address      : String;
        Age : Integer;
        Dob : Date;
        // Date : Date;
        // lecage : Integer ;
        DepartmentName: String;
        AdditionalSkills: String;
        Gender : String;
        Status : String default 'In Process';
        RejectedBy : String;
        TeatoFile     :  Composition of many Files on TeatoFile.FiletoTea = $self;
}

entity gender1 {
    gender : String;
}

entity TeacherDetails {
    key Tuuid : UUID;
    key TeacherID : String;
    DepartmentID     : String;
    Name         : String;
    PhoneNumber  : String; 
    Status : String default 'Approved';
    Email        : String;
    Address      : String;
    teachToDept : Association to many Department on teachToDept.DepartmentID = DepartmentID;
}


entity Sequence {
    key Name : String;
    Value   : Integer;
}

entity authorisation {
    key Email : String;
    role : String;
    DepartmentName: String;
}


using {
    cuid,
    managed
} from '@sap/cds/common';

entity Files: cuid, managed{
    ttuuid : String;
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    FiletoTea : Association to many Teacher on FiletoTea.ttuuid = ttuuid;
}