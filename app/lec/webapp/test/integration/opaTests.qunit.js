sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'lec/test/integration/FirstJourney',
		'lec/test/integration/pages/LecturerList',
		'lec/test/integration/pages/LecturerObjectPage'
    ],
    function(JourneyRunner, opaJourney, LecturerList, LecturerObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('lec') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheLecturerList: LecturerList,
					onTheLecturerObjectPage: LecturerObjectPage
                }
            },
            opaJourney.run
        );
    }
);