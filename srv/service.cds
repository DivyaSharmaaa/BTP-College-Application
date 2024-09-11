using db from '../db/schema';

service MyService {
    @odata.draft.enabled
    entity Department as projection on db.Department;
    entity Student as projection on db.Student;
    entity TeacherDetails as projection on db.TeacherDetails;

    
    @odata.draft.enabled
    @odata.draft.bypass


    // @Common.SideEffects  : {
    //     $Type : 'Common.SideEffectsType',
    //     SourceProperties : [
    //         'Date'
    //     ], 
    //     TargetProperties : [
    //         'lecage',
    //     ]
    // }

    entity Teacher as projection on db.Teacher;  
    @odata.draft.enabled
    entity Sequence as projection on db.Sequence;
    entity authorisation as projection on db.authorisation;
    entity Files as projection on db.Files;
    entity gender1 as projection on db.gender1;

   }