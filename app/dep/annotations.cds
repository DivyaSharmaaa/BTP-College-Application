using MyService as service from '../../srv/service';
using from '../../db/schema';
annotate service.Department with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            // {
            //     $Type : 'UI.DataField',
            //     Label : '{i18n>Did}',
            //     Value : DID,
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Label : 'DNAME',
            //     Value : DNAME,
            // },
            {
                $Type : 'UI.DataField',
                Value : DepartmentID,
                Label : 'DepartmentID',
            },{
                $Type : 'UI.DataField',
                Value : DepartmentName,
                Label : 'DepartmentName',
            },],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Teacher',
            ID : 'Teacher',
            Target : 'deptToTeacher/@UI.LineItem#Teacher',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Student',
            ID : 'Student',
            Target : 'deptToStudent/@UI.LineItem#Student',
        },
        // {
        //     $Type : 'UI.ReferenceFacet',
        //     Label : 'Lecturer',
        //     ID : 'Lecturer',
        //     Target : 'DeptoCollLec/@UI.LineItem#Lecturer',
        // },
        // {
        //     $Type : 'UI.ReferenceFacet',
        //     Label : 'Student',
        //     ID : 'Student',
        //     Target : 'DeptoStu/@UI.LineItem#Student',
        // },
        // {
        //     $Type : 'UI.ReferenceFacet',
        //     Label : 'Student table',
        //     ID : 'Studenttable',
        //     Target : 'DeptoStu/@UI.LineItem#Studenttable',
        // },
    ],
    UI.LineItem : [
        // {
        //     $Type : 'UI.DataField',
        //     Label : 'DID',
        //     Value : DID,
        // },
        // {
        //     $Type : 'UI.DataField',
        //     Label : 'DNAME',
        //     Value : DNAME,
        // },
        {
            $Type : 'UI.DataField',
            Value : DepartmentID,
            Label : 'DepartmentID',
        },{
            $Type : 'UI.DataField',
            Value : DepartmentName,
            Label : 'DepartmentName',
        },],
);

// annotate service.Student with @(
//     UI.LineItem #Department : [
//     ]
// );
// annotate service.Student with @(
//     UI.Facets : [
//         {
//             $Type : 'UI.ReferenceFacet',
//             Label : 'Student',
//             ID : 'Student',
//             Target : '@UI.FieldGroup#Student',
//         },
//     ],
//     UI.FieldGroup #Student : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Value : DID,
//                 Label : 'DID',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : SID,
//                 Label : 'SID',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : SMAIL,
//                 Label : 'SMAIL',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : SNAME,
//                 Label : 'SNAME',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : SPHONE,
//                 Label : 'SPHONE',
//             },],
//     }
// );
// annotate service.Student with @(
//     UI.LineItem #Student : [
//         {
//             $Type : 'UI.DataField',
//             Value : SID,
//             Label : 'SID',
//         },{
//             $Type : 'UI.DataField',
//             Value : DID,
//             Label : 'DID',
//         },{
//             $Type : 'UI.DataField',
//             Value : SMAIL,
//             Label : 'SMAIL',
//         },{
//             $Type : 'UI.DataField',
//             Value : SNAME,
//             Label : 'SNAME',
//         },{
//             $Type : 'UI.DataField',
//             Value : SPHONE,
//             Label : 'SPHONE',
//         },]
// );
annotate service.Department with @(
    // UI.SelectionFields : [
    //     DNAME,]
);


annotate service.Department with {
    // DID @Common.Label : 'DID'
};
annotate service.Department with {
    // DNAME @Common.Label : 'DNAME'
};
// annotate service.CollegeLec with @(
//     UI.Facets : [
//         {
//             $Type : 'UI.ReferenceFacet',
//             Label : 'lecturer',
//             ID : 'lecturer',
//             Target : '@UI.FieldGroup#lecturer',
//         },
//     ],
//     UI.FieldGroup #lecturer : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Value : LID,
//                 Label : '{i18n>Lid}',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : LNAME,
//                 Label : 'LNAME',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : LMAIL,
//                 Label : 'LMAIL',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : LPHONE,
//                 Label : 'LPHONE',
//             },],
//     }
// );
// annotate service.CollegeLec with @(
//     UI.LineItem #Lecturer : [
//         {
//             $Type : 'UI.DataField',
//             Value : LID,
//             Label : '{i18n>Lid}',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : LNAME,
//             Label : 'LNAME',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : LMAIL,
//             Label : 'LMAIL',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : LPHONE,
//             Label : 'LPHONE',
//         },]
// );
// annotate service.CollegeLec with {
//     LID @(Common.ValueList : {
//             $Type : 'Common.ValueListType',
//             CollectionPath : 'Lecturer',
//             Parameters : [
//                     {
//                         $Type : 'Common.ValueListParameterInOut',
//                         LocalDataProperty : LID,
//                         ValueListProperty : 'LID',
//                     },
//                     {
//                         $Type : 'Common.ValueListParameterInOut',
//                         ValueListProperty : 'LNAME',
//                         LocalDataProperty : LNAME,
//                     },
//                     {
//                         $Type : 'Common.ValueListParameterInOut',
//                         ValueListProperty : 'LPHONE',
//                         LocalDataProperty : LPHONE,
//                     },
//                 {
//                     $Type : 'Common.ValueListParameterInOut',
//                     ValueListProperty : 'LMAIL',
//                     LocalDataProperty : LMAIL,
//                 },
//                 ],
//             Label : '{i18n>Lid}',
//         },
//         Common.ValueListWithFixedValues : true
// )};
// annotate service.CollegeLec with @(
//     UI.SelectionPresentationVariant #Lecturer : {
//         $Type : 'UI.SelectionPresentationVariantType',
//         PresentationVariant : {
//             $Type : 'UI.PresentationVariantType',
//             Visualizations : [
//                 '@UI.LineItem#Lecturer',
//             ],
//         },
//         SelectionVariant : {
//             $Type : 'UI.SelectionVariantType',
//             SelectOptions : [
//             ],
//         },
//     }
// );
// annotate service.CollegeLec with {
//     LNAME @Common.FieldControl : #ReadOnly
// };
// annotate service.CollegeLec with {
//     LMAIL @Common.FieldControl : #ReadOnly
// };
// annotate service.CollegeLec with {
//     LPHONE @Common.FieldControl : #ReadOnly
// };
// annotate service.Student1 with @(
//     UI.LineItem #Studenttable : [
//         {
//             $Type : 'UI.DataField',
//             Value : SID,
//             Label : 'SID',
//         },{
//             $Type : 'UI.DataField',
//             Value : SMAIL,
//             Label : 'SMAIL',
//         },{
//             $Type : 'UI.DataField',
//             Value : SNAME,
//             Label : 'SNAME',
//         },{
//             $Type : 'UI.DataField',
//             Value : SPHONE,
//             Label : 'SPHONE',
//         },]
// );
// annotate service.Student1 with @(
//     UI.Facets : [
//         {
//             $Type : 'UI.ReferenceFacet',
//             Label : 'Student Details',
//             ID : 'StudentDetails',
//             Target : '@UI.FieldGroup#StudentDetails',
//         },
//     ],
//     UI.FieldGroup #StudentDetails : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Value : SID,
//                 Label : 'SID',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : SMAIL,
//                 Label : 'SMAIL',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : SNAME,
//                 Label : 'SNAME',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : SPHONE,
//                 Label : 'SPHONE',
//             },],
//     }
// );
annotate service.Department with @(
    UI.HeaderFacets : [],
    // UI.FieldGroup #DID : {
    //     $Type : 'UI.FieldGroupType',
    //     Data : [
    //         {
    //             $Type : 'UI.DataField',
    //             Value : DID,
    //         },],
    // }
);
annotate service.Department with @(
    // UI.HeaderInfo : {
    //     Title : {
    //         $Type : 'UI.DataField',
    //         Value : DID,
    //     },
    //     TypeName : '',
    //     TypeNamePlural : '',
    // }
);
annotate service.TeacherDetails with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Teacher',
            ID : 'Teacher',
            Target : '@UI.FieldGroup#Teacher',
        },]
);
annotate service.Department with @(
    UI.LineItem #lecturer : [
    ]
);
annotate service.TeacherDetails with @(
    UI.LineItem #Teacher : [
        {
            $Type : 'UI.DataField',
            Value : TeacherID,
            Label : 'TeacherID',
        },{
            $Type : 'UI.DataField',
            Value : PhoneNumber,
            Label : 'PhoneNumber',
        },{
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },{
            $Type : 'UI.DataField',
            Value : Email,
            Label : 'Email',
        },{
            $Type : 'UI.DataField',
            Value : Address,
            Label : 'Address',
        },]
);
annotate service.Department with @(
    UI.LineItem #Teacher : [
        {
            $Type : 'UI.DataField',
            Value : deptToTeacher.TeacherID,
            Label : 'TeacherID',
        },{
            $Type : 'UI.DataField',
            Value : deptToTeacher.PhoneNumber,
            Label : 'PhoneNumber',
        },{
            $Type : 'UI.DataField',
            Value : deptToTeacher.Name,
            Label : 'Name',
        },{
            $Type : 'UI.DataField',
            Value : deptToTeacher.Email,
            Label : 'Email',
        },{
            $Type : 'UI.DataField',
            Value : deptToTeacher.Address,
            Label : 'Address',
        },]
);
annotate service.Student with @(
    UI.LineItem #Student : [
        {
            $Type : 'UI.DataField',
            Value : StudentID,
            Label : 'StudentID',
        },{
            $Type : 'UI.DataField',
            Value : PhoneNumber,
            Label : 'PhoneNumber',
        },{
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },{
            $Type : 'UI.DataField',
            Value : Email,
            Label : 'Email',
        },{
            $Type : 'UI.DataField',
            Value : Address,
            Label : 'Address',
        },]
);
annotate service.Student with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Student',
            ID : 'Student',
            Target : '@UI.FieldGroup#Student',
        },
    ],
    UI.FieldGroup #Student : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : StudentID,
                Label : 'Student ID',
            },{
                $Type : 'UI.DataField',
                Value : PhoneNumber,
                Label : 'Student PhoneNumber',
            },{
                $Type : 'UI.DataField',
                Value : Name,
                Label : 'Student Name',
            },{
                $Type : 'UI.DataField',
                Value : Email,
                Label : 'Student Email',
            },{
                $Type : 'UI.DataField',
                Value : Address,
                Label : 'Student Address',
            },],
    }
);
annotate service.TeacherDetails with {
    TeacherID @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Teacher',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : TeacherID,
                    ValueListProperty : 'TeacherID',
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'Name',
                    LocalDataProperty : Name,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'PhoneNumber',
                    LocalDataProperty : PhoneNumber,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'Email',
                    LocalDataProperty : Email,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'Address',
                    LocalDataProperty : Address,
                },
                {
                    $Type : 'Common.ValueListParameterIn',
                    ValueListProperty : 'Status',
                    LocalDataProperty : Status,
                },
            ],
            Label : 'TeacherID',
        },
        Common.ValueListWithFixedValues : true,
        )};
annotate service.Department with {
    DepartmentName @Common.FieldControl : #Mandatory
};
annotate service.Student with {
    PhoneNumber @Common.FieldControl : #Mandatory
};
annotate service.Student with {
    Name @Common.FieldControl : #Mandatory
};
annotate service.Student with {
    Email @Common.FieldControl : #Mandatory
};
annotate service.Student with {
    Address @Common.FieldControl : #Mandatory
};
annotate service.TeacherDetails with @(
    UI.FieldGroup #Teacher : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : TeacherID,
                Label : 'Teacher ID',
            },{
                $Type : 'UI.DataField',
                Value : Name,
                Label : 'Teacher Name',
            },{
                $Type : 'UI.DataField',
                Value : Email,
                Label : 'Teacher Email',
            },{
                $Type : 'UI.DataField',
                Value : Address,
                Label : 'Teacher Address',
            },
            {
                $Type : 'UI.DataField',
                Value : PhoneNumber,
                Label : 'Teacher PhoneNumber',
            },],
    }
);
annotate service.TeacherDetails with {
    Name @Common.FieldControl : #ReadOnly
};
annotate service.TeacherDetails with {
    Email @Common.FieldControl : #ReadOnly
};
annotate service.TeacherDetails with {
    Address @Common.FieldControl : #ReadOnly
};
annotate service.TeacherDetails with {
    PhoneNumber @Common.FieldControl : #ReadOnly
};
annotate service.Department with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : DepartmentID,
        },
        TypeName : '',
        TypeNamePlural : '',
    }
);
annotate service.Student with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : StudentID,
        },
        TypeName : '',
        TypeNamePlural : '',
    }
);
annotate service.TeacherDetails with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : TeacherID,
        },
        TypeName : '',
        TypeNamePlural : '',
    }
);
