<p align="center">
  <img src="https://essencetool.github.io/essence/img/logo-essence.jpg" alt="Essence logo"/>
</p>


# Essence
Essence is a open-source project to help educators for acquiring/evaluating the entrepreneurial competences. Learn more about the project at [the web of the European Project](https://essenceproject.eu/project-objectives/)

Essence Tool is build upon web technologies and it is only need to use a browser to use it. The web-browser requires the IndexedDB API (see [compatibility](https://caniuse.com/#feat=indexeddb)).

As all the data you manage in the app is stored in your browser, you are free to use the tool from the following URL: https://essencetool.github.io/essence/


## Getting Started
However, there are a few cases in which you should download the tool in your computer. 

* If you want to create your own rubrics or self-assessments
* If you want to embed this tool inside another education platform such as [Sakai](https://www.sakailms.org/)
* If your needs require to modify the source files of the project
* If you need to create a custom translation of the app


All you need to do is to download the project (as is described in the following figure), unzip it to a local folder, and then open the file "index.html" in your favorite browser.
![how-to-download-project](./doc/tutorial-download-tool.png)



### build
In addition, it is possible to use [Nativier](https://github.com/jiahaog/nativefier/blob/master/docs/api.md#platform) to build a desktop version of the platform. Here are some examples. 

```
nativefier --name "Essence App" "https://essencetool.github.io/essence/"
nativefier --name "Essence App" "https://essencetool.github.io/essence/" --platform windows
```

Pre-build versions can be fount at
```
https://pln.inf.um.es/essence/dist/essence-win.zip
https://pln.inf.um.es/essence/dist/essence-linux.zip
```

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## License
This project is licensed under the MIT License

## Acknowledgments
This project is funded by the European Union by the [Erasmus+ program](https://ec.europa.eu/programmes/erasmus-plus/node_en)


<p align="center">
  <img src="https://essencetool.github.io/essence/img/logo-erasmus.png" alt="Eramus Project"/>
</p>
