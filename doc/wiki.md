# E.S.S.E.N.C.E. Tool
## Introduction
#### _What is the E.S.S.E.N.C.E. tool and why am I interested?_
Essence Project provides a tool for easing the evaluation of transversal skills such as critical thinking, creativity and initiative. In addition, this tool helps the student in acquiring/evaluating the entrepreneurial competences.

You can download a description and a tutorial with images in PDF from:
https://essencetool.github.io/essence/doc/tutorial.pdf

There are two ways to use the app: as web-app (recommended) or as a desktop application

- To use the web-app you can visit the following URL: https://essencetool.github.io/essence/. The first time the web-app is open, the browser will suggest you to add it to your home screen.
- Yo use the tool as a desktop application you have two available versions.
    - https://pln.inf.um.es/essence/dist/essence-win.zip
    - https://pln.inf.um.es/essence/dist/essence-linux.zip


## Key concepts
The E.S.S.E.N.C.E. tool does not use a central database. Instead of this, all your information is stored locally in your web browser. However, we will see how it is possible to share your data between your devices by exporting or importing.

This tool was designed for flexibility:
- It allows to organise evaluations within projects. 
- It allows to organise your sessions in groups and subgroups.
- Advance users can extend the tool to include other rubrics and self-assessments.

Finally, apart from educators, this tool can be used by students for performing an auto-evaluation of their competences. The results are calculated automatically and the same students can download their results. To do it, you only need to share the following URL to your students: https://essencetool.github.io/essence/#assessment


## Internationalization
The tool will search automatically if there is an available translation based on the language in which browser is configured.
If there is no translation available, the tool will be in English.

A list of available languages can be found at: https://github.com/essencetool/essence/tree/master/js/nls

- English: https://essencetool.github.io/essence/#set-locale/en-en
- Portuguese: https://essencetool.github.io/essence/#set-locale/pt-pt
- Italian: https://essencetool.github.io/essence/#set-locale/it-it
- Swedish: https://essencetool.github.io/essence/#set-locale/se-se
- Finnish: https://essencetool.github.io/#set-locale/fi-fi
- Polish: https://essencetool.github.io/#set-locale/pl-pl
- Turkish: https://essencetool.github.io/#set-locale/tr-tr


If you need to create a new one, you need to:
- Register a new language. You need to open ```js/nls/assessments.js```, ```js/nls/rubrics.js```, and ```js/nls/translations.js``` and add the new iso code. In this example, we are registering the france language for the self assessments
```
define (['json!nls/assessments.json'], function (root) {
    return {
        "root": root,
        ...
        "fr-fr": true,
    };
});
```
- Create a folder with your iso code as name. For example, `fr-fr` and copy the files from an existing translation inside. You now will have the files ```assessments.js```, ```rubrics.js```, and ```root.js``` in the new folder.
- Edit these files with your favorite notepad and update the translations. These files a key-values, you only need to update the value on the right:
```
"description": "<h2>Lavorare sulla tua vision del futuro.</h2> <p>La vision è un processo nel quale le immagini degli obiettivi e dei risultati futuri che si desiderano realizzare agiscono come motivazione per l'azione presente.</p> <p>L'immaginazione è la capacità di produrre e simulare mentalmente nuovi oggetti, persone e idee.</p><p> Pensare strategicamente è un modo di guardare le cose e collegarle tra loro.</p>",
```
Note that some of the values can have placeholders or HTML code, please leave at the same way.
- You will need to refresh the cache of the browser to get your translated version. You can also force the tool open with the new language by typing in the address bar of your browser: https://essencetool.github.io/#set-locale/fr-fr (replacing ```fr-fr``` for your iso-code)


## Sections
E.S.S.E.N.C.E. tool is organised in sections. 
There is a menu on the upper-right corner in mobile or upper-left corner in desktop computers.

### Groups and subgroups
Groups and subgroups allow you to organise your students and allow to rate multiple students at once. There are some pre-built groups and subgroups loaded for this tutorial in the app.

### Import students
This section allows to import students automatically. Students must be linked to a group / subgroup.

You can use two available templates from import the students: one in XLSX (Microsoft Excel) and other in CSV (Comma Separated Values)

**TIP**: If you want to test with fake-data you can generate random values by running the following script in your web-browser:
https://pln.inf.um.es/essence/scripts/generate-fake-students-data

### Projects
A project is a handy way you can organise your evaluations. The tool starts with a default_project. Projects may include a description.

### Evaluations
Evaluations are binded to projects and rubrics. 

The tool is flexible and you can rate students individually or by groups. Each criteria can be rated as ```very-good```, ```good```, ```acceptable``` or ```unacceptable```. In addiition, it is possible to include evidences to remember you evaluation.

### Students
In this section you can view and edit the imported student and view and export their progress.

### Self-assessments
Self-assessments allows to the students to see their progress by responding a set of questions. Results are shown online and can be stored and they can be downloaded as plain files and open with several editors and word-processors. It is very important to remark that the results of the self-Assessments are not stored in the application.

### Export / Import database
These sections allows you to export all your data. It can be used to transfer your data from one device to another.


## How to create new rubrics and self-assessments
The file ```assets/initial-database.json``` contains the data that is loaded the first time you enter in the application. It contains the rubrics, self-assessments, default projects, etc. You can modify this file to accomodate your needs. 

This is an example of a rubric:
```
{
    "id": 1,
    "name": "Assessment rubric for the ball (Working with others)",
    "description": "To be used as an expert assessment tool, as a peer to peer tool, or as a self-assessment tool.",
    "color": [255, 99, 132],

    "valorations": [{
            "text": "Very good",
            "id": 1,
            "score": 4
        },
        {
            "text": "Good",
            "id": 2,
            "score": 3
        },
        {
            "text": "Acceptable",
            "id": 3,
            "score": 2
        },
        {
            "text": "Unacceptable",
            "id": 4,
            "score": 1
        }
    ],
    "rows": [{
        "key": "planning",
        "name": "Planning",
        "values": [{
                "id": 1,
                "text": "Participate in planning by making valuable proposals and making reasoned decisions."
            },
            {
                "id": 2,
                "text": "Participates in decision-making but does not make important proposals."
            },
            {
                "id": 3,
                "text": "Does not participate in goal planning, but accepts the group's decision."
            },
            {
                "id": 4,
                "text": "Does not participate in planning goals and boycotts decisions made by peers."
            }
        ]
    }, {
        "key": "time",
        "name": "Time",
        "values": [{
                "id": 1,
                "text": "Estimates the time required by the development steps of a product or task and adapts to possible changes and unforeseen events."
            },
            {
                "id": 2,
                "text": "Estimates the time required for the development steps of a product or task but has difficulty adapting to possible changes and unforeseen events."
            },
            {
                "id": 3,
                "text": "Makes a planning little adapted to the time required for the development of the task but adapts to present it in time"
            },
            {
                "id": 4,
                "text": "Does not plan the time required for each step of the task in a way that ends up not presenting it or presenting it incomplete."
            }
        ]
    }, {
        "key": "material",
        "name": "Material",
        "values": [{
                "id": 1,
                "text": "It provides the necessary material (physical material, previous research at home...) to be able to work well in class and is concerned that this material is of good quality."
            },
            {
                "id": 2,
                "text": "It provides material to be able to work in class, but the quality is not very high or even has some failure that does not prevent the performance of the work."
            },
            {
                "id": 3,
                "text": "Provides material late or with errors that hinder the performance of group work."
            },
            {
                "id": 4,
                "text": "It does not provide enough material to be able to do the job properly."
            }
        ]
    }, {
        "key": "tranquillity",
        "name": "Tranquillity",
        "values": [{
                "id": 1,
                "text": "Remains calm in the face of difficulties in performing a sequence of activities and finds alternative solutions."
            },
            {
                "id": 2,
                "text": "He has difficulty keeping calm in the face of difficulties but ends up finding solutions."
            },
            {
                "id": 3,
                "text": "Keeps calm in the face of difficulties and asks for help or examples."
            },
            {
                "id": 4,
                "text": "You have difficulty keeping calm in the face of difficulties as well as asking for help or accepting the help you are given."
            }
        ]
    }, {
        "key": "motivation",
        "name": "Motivation",
        "values": [{
                "id": 1,
                "text": "Maintains motivation towards the activity from the first moment to the last."
            },
            {
                "id": 2,
                "text": "Start the activity highly motivated but have difficulty maintaining it throughout the course of the activity."
            },
            {
                "id": 3,
                "text": "You need support from your group or teachers to maintain motivation towards the activity."
            },
            {
                "id": 4,
                "text": "Their low motivation causes problems in the group."
            }
        ]
    }, {
        "key": "help-and-respect",
        "name": "Help & Respect",
        "values": [{
                "id": 1,
                "text": "Encourage other members of your group and recognize the work they do. Respect the limitations of others and help them to improve and learn from them."
            },
            {
                "id": 2,
                "text": "It takes advantage of the potentialities of others and respects their limitations although it does not do much to help them. He cares more about getting the job done than he cares about helping others."
            },
            {
                "id": 3,
                "text": "Has difficulty recognizing the potential of peers and becomes angry at their limitations. tends more to individual work than to group work."
            },
            {
                "id": 4,
                "text": "It's individualistic. He doesn't recognize the work of his classmates. He ends up sheathing himself and not working with the group or making group work difficult."
            }
        ]
    }, {
        "key": "delegate",
        "name": "Delegate",
        "values": [{
                "id": 1,
                "text": "Accept criticism from peers and try to rectify for the better.Is aware of which peers that can improve the work and delegates to them."
            },
            {
                "id": 2,
                "text": "He hears criticism from, peers but it's hard for him to change for the better. He delegates to peers what he knows they can do better."
            },
            {
                "id": 3,
                "text": "He gets angry with the critics but ends up rectifying.He finds it difficult to delegate to peers but manage to delegate some things."
            },
            {
                "id": 4,
                "text": "He doesn't accept criticism and doesn't know how to delegate. He wants to do everything because he doesn't trust his teammates."
            }
        ]
    }, {
        "key": "friendliness",
        "name": "Friendliness",
        "values": [{
                "id": 1,
                "text": "When you don't agree with what a colleague does or says, you know how to give him or her alternatives with correct and respectful language."
            },
            {
                "id": 2,
                "text": "Expresses disagreement with a partner, but does not suggest alternatives and/or uses inappropriate language."
            },
            {
                "id": 3,
                "text": "When he doesn't agree with something, he gets angry and doesn't allow himself to talk about it or look for alternatives, even though he ends up giving in."
            },
            {
                "id": 4,
                "text": "When he disagrees with something, he gets angry and provokes conflicts instead of looking for alternative solutions."
            }
        ]
    }]
},
```

As you can see, it is possible to modify this values to create a new rubric or modify the existing ones. The score and valoration are configurable. However, there are a few things that are important to remember:

- You will need to remove the data stored in your browser to load the new default data. You can force this by opening this URL in your browser: https://essencetool.github.io/essence/#reset. But remember to make a backup before
- In order to work properly, you are encouraged to create the new translations of your rubrics to the different available languages.
