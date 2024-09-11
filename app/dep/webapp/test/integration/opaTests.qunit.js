sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'dep/test/integration/FirstJourney',
		'dep/test/integration/pages/DepartmentList',
		'dep/test/integration/pages/DepartmentObjectPage',
		'dep/test/integration/pages/StudentObjectPage'
    ],
    function(JourneyRunner, opaJourney, DepartmentList, DepartmentObjectPage, StudentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('dep') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDepartmentList: DepartmentList,
					onTheDepartmentObjectPage: DepartmentObjectPage,
					onTheStudentObjectPage: StudentObjectPage
                }
            },
            opaJourney.run
        );
    }
);