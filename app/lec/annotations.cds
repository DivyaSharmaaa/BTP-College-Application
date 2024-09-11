using from '../../srv/service';
using from '../../db/schema';

 annotate MyService.Teacher with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : TeacherID,
            Label : 'TeacherID',
        },
        {
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },
        {
            $Type : 'UI.DataField',
            Value : Status,
            Label : 'Status',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : Status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'In Process',
                        },
                    ],
                },
            ],
        },
        Text : 'In Process',
    },
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : TeacherID,
            Label : 'TeacherID',
        },
        {
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },
        {
            $Type : 'UI.DataField',
            Value : Status,
            Label : 'Status',
        },
        {
            $Type : 'UI.DataField',
            Value : RejectedBy,
            Label : 'RejectedBy',
        },
    ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : Status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Rejected',
                        },
                    ],
                },
            ],
        },
        Text : 'Rejected',
    },
    UI.LineItem #tableView1 : [
        {
            $Type : 'UI.DataField',
            Value : TeacherID,
            Label : 'TeacherID',
        },
        {
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },
        {
            $Type : 'UI.DataField',
            Value : Status,
            Label : 'Status',
        },
    ],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : Status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approved',
                        },
                    ],
                },
            ],
        },
        Text : 'Hired',
    },
    UI.LineItem #tableView2 : [
        {
            $Type : 'UI.DataField',
            Value : TeacherID,
            Label : 'TeacherID',
        },
        {
            $Type : 'UI.DataField',
            Value : Status,
            Label : 'Status',
        },
        {
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },
    ],
    UI.SelectionPresentationVariant #tableView3 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView2',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : Status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approved',
                        },
                    ],
                },
            ],
        },
        Text : 'Hired',
    },
    UI.LineItem #tableView3 : [
        {
            $Type : 'UI.DataField',
            Value : TeacherID,
            Label : 'TeacherID',
        },
        {
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },
        {
            $Type : 'UI.DataField',
            Value : RejectedBy,
            Label : 'RejectedBy',
        },
        {
            $Type : 'UI.DataField',
            Value : Status,
            Label : 'Status',
        },
    ],
    UI.SelectionPresentationVariant #tableView4 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView3',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : Status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Rejected',
                        },
                    ],
                },
            ],
        },
        Text : 'Rejected Lecturer',
    },
    UI.LineItem #tableView4 : [
        {
            $Type : 'UI.DataField',
            Value : TeacherID,
            Label : 'TeacherID',
        },
        {
            $Type : 'UI.DataField',
            Value : Status,
            Label : 'Status',
        },
        {
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },
    ],
    UI.SelectionPresentationVariant #tableView5 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView4',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : Status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approved',
                        },
                    ],
                },
            ],
        },
        Text : 'Hired Lecturer',
    },
);
annotate MyService.Teacher with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Teacher',
            ID : 'Teacher',
            Target : '@UI.FieldGroup#Teacher',
        },],
    UI.FieldGroup #AddTeacher : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : TeacherID ,
                Label : 'TeacherID',
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
                Value : PhoneNumber,
                Label : 'PhoneNumber',
            },{
                $Type : 'UI.DataField',
                Value : Address,
                Label : 'Address',
            },],
    }
);
annotate MyService.Teacher with @(
    UI.HeaderInfo : {
        TypeName : '',
        TypeNamePlural : '',
        Title : {
            $Type : 'UI.DataField',
            Value : Name,
        },
    }
);
annotate MyService.Teacher with @(
    UI.FieldGroup #Teacher : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : TeacherID,
                Label : 'Teacher ID',
            },{
                $Type : 'UI.DataField',
                Value : PhoneNumber,
                Label : 'Teacher PhoneNumber',
            },{
                $Type : 'UI.DataField',
                Value : Name,
                Label : 'Teacher Name',
            },{
                $Type : 'UI.DataField',
                Value : Address,
                Label : 'Teacher Address',
            },{
                $Type : 'UI.DataField',
                Value : Email,
                Label : 'Teacher Email',
            },
            {
                $Type : 'UI.DataField',
                Value : AdditionalSkills,
                Label : 'Teacher AdditionalSkills',
            },
            {
                $Type : 'UI.DataField',
                Value : DepartmentName,
                Label : 'Teacher DepartmentName',
            },
            {
                $Type : 'UI.DataField',
                Value : Gender,
                Label : 'Teacher Gender',
            },
            {
                $Type : 'UI.DataField',
                Value : Dob,
                Label : 'Teacher DOB',
            },
            {
                $Type : 'UI.DataField',
                Value : Age,
                Label : 'Teacher Age',
            },],
    }
);
annotate MyService.Teacher with @(
    UI.HeaderFacets : [],
    UI.FieldGroup #TeacherID : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : TeacherID,
                Label : 'TeacherID',
            },],
    }
);
annotate MyService.Teacher with {
    PhoneNumber @Common.FieldControl : #Mandatory
};
annotate MyService.Teacher with {
    Name @Common.FieldControl : #Mandatory
};
annotate MyService.Teacher with {
    Email @Common.FieldControl : #Mandatory
};
annotate MyService.Teacher with {
    Address @Common.FieldControl : #Mandatory
};
//                 Label : 'LID',
//                 Value : LID,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'LNAME',
//                 Value : LNAME,
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
//             },
//         ],
//     },
//     UI.Facets : [
//         {
//             $Type : 'UI.ReferenceFacet',
//             ID : 'GeneratedFacet1',
//             Label : 'General Information',
//             Target : '@UI.FieldGroup#GeneratedGroup',
//         },
//     ],
//     UI.LineItem : [
//         {
//             $Type : 'UI.DataField',
//             Label : 'LID',
//             Value : LID,
//         },
//         // {
//         //     $Type : 'UI.DataField',
//         //     Label : 'DID',
//         //     Value : DID,
//         // },
//         {
//             $Type : 'UI.DataField',
//             Label : 'LNAME',
//             Value : LNAME,
//         },
//     ],
// );

// annotate service.Lecturer with {
//     LNAME @Common.FieldControl : #Mandatory
// };
// annotate service.Lecturer with {
//     LMAIL @Common.FieldControl : #Mandatory
// };
// annotate service.Lecturer with {
//     LPHONE @Common.FieldControl : #Mandatory
// };
// annotate service.Lecturer with @(
//     UI.HeaderInfo : {
//         Title : {
//             $Type : 'UI.DataField',
//             Value : LID,
//         },
//         TypeName : '',
//         TypeNamePlural : '',
//     }
// );
annotate MyService.Teacher with {
    TeacherID @Common.FieldControl : #ReadOnly
};

annotate MyService.Teacher with {
    DepartmentName @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Department',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : DepartmentName,
                    ValueListProperty : 'DepartmentName',
                },
            ],
            Label : 'Department Name',
        },
        Common.ValueListWithFixedValues : true,
        Common.FieldControl : #Mandatory,
)};

annotate MyService.Teacher with {
    // lecage @Common.FieldControl : #ReadOnly
};

annotate MyService.Teacher with {
    Dob @Common.FieldControl : #Mandatory
};

annotate MyService.Teacher with {
    Gender @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'gender1',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Gender,
                    ValueListProperty : 'gender',
                },
            ],
            Label : 'Gender',
        },
        Common.ValueListWithFixedValues : true
)};

