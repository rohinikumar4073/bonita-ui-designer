# Page Designer Tests

## Run tests

The module relies on Maven to run the app (the generated war in the `backend` directory), run the tests via npm and Protractor, and stop the app.
It uses the directories in `src/test/resources` as workspace, so if you add new pages in there, you can test them.
A profile `integration-test` has been created to launch the tests only on purpose.

    mvn integration-test
    
The `pre-integration-test` phase will run the jar, the `integration-test` will test the pages with Protractor, and the `post-integration-phase` will stop the app.

### Alternative
By default mvn task will check for _ddescribe_ and _iit_ in spec files and fail if it find some. To avoid that in dev phase you can launch tests via gulp

    gulp test

## Add a test

You can easily add a test by running the app as usual from the current directory : 
 
    java -jar ../backend/webapp/target/ui-designer-1.0.2-SNAPSHOT-standalone.jar -Drepository.pages=src/test/resources/pages/ -Drepository.fragments=src/test/resources/fragments/ -Drepository.widgets=./target/widgets
    
Once started, you can go to [your browser](http://localhost:8080/designer/) and add a new page.
The page is gonna be saved in `src/test/resources/pages` with a UUID. 
For ease of use, you should rename the page to something simple, reflecting your use case (e.g. 'repeatLabelOverCollection.json').
Once that's done, you can add a new Protractor test in `src/test/javascript`, with the same naming convention (e.g. 'repeatLabelOverCollection.spec.js').
