<script lang="ts" setup>
import BookOpen from "../../Icons/BookOpen.vue"
import ArrowDown from "../../Icons/ArrowDown.vue"
</script>

<script lang="ts">
export default {
    name: "ConfirmModal",
    data() {
        return {
            without_: false,
            keepGoing: true,
            repeated: 0,
            dataIWant: null,
            contentSpans: null,
            time: 1700        }
    },
    props: {
        action: Function,
        object: Object
    },
    components: {
        BookOpen,
        ArrowDown
    },
    methods: {
        faxify() {
            var margin = document.getElementById("margin");
            var hole = document.getElementsByClassName("hole");
            var span = document.createElement("span");
            var marginSize = window.innerHeight - (window.innerHeight * (35 / 100));
            var numberOfMaxHoles = marginSize / 27;
            //design
            for (var i = 0; i < numberOfMaxHoles; i++) {
                span.classList.add("hole");
                margin.appendChild(span.cloneNode(true));
            }
        },
        add(conteneur, text, index) {
            // j'ajoute à mon conteneur le texte caractère par caratère en partant de l'index donné dans les options de la fonction
            conteneur.textContent += text.charAt(index);
            //clean le texte d'espaces incongrus
            conteneur.textContent.trim();
        },
        blink(conteneur, contenu) {
            if (!this.without_) {
                this.without_ = true; //
                conteneur.textContent = contenu.slice(0, contenu.length);
            } else {
                conteneur.textContent += "_";
                this.without_ = false;
            }
        },
        infiniteBlink(conteneur, contenu) {
            var infinite = this.infiniteBlink;
            var blinkIt = this.blink;
            if (this.keepGoing && (this.repeated <= 4)) {
                this.repeated++;
                setTimeout(function () {
                    infinite(conteneur, contenu);
                    blinkIt(conteneur, contenu);
                }, 500);
            }
            if (this.repeated >= 5) {
                this.keepGoing = false;
            }
        },
        scanText(contenu, conteneur) {
            var adding = this.add;
            var blink = this.infiniteBlink;
            for (var i = 0; i <= contenu.length; i++) {
                (function (x) {
                    var enableTiming = function () {
                        adding(conteneur, contenu, x);
                        if (x == 1) {
                            document.getElementById('textZone').scrollTo({
                                top: document.getElementById('textZone').scrollHeight + 50
                           });
                        }
                        if (x == contenu.length) {
                            blink(conteneur, contenu);
                        }
                    };
                    setTimeout(enableTiming, i * 70);

                })(i); //
            }
        },
        firstPromise() {
            //console.log('mapromesse');
            var writingConteneur = document.getElementById("dataBind");
            var writingContent = writingConteneur.dataset.text;
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('doing my promise');
                    this.scanText(writingContent, writingConteneur);
                    //secondPromise=true;
                    setTimeout(() => { resolve('success') }, this.time + (90 * writingConteneur.dataset.text.length));
                }, 1000)
            }).then((value) => {
                console.log('firstPromise done !');
                var dataIWant = document.getElementById("datas_");
                var elements = dataIWant.childNodes;
                this.main(elements);
            })
        },
        preventProperties(element, value, preventedValue) {
            //console.log(value == preventedValue);

            if (value == preventedValue) {
                //console.log(value);
                    element.remove();
                }
            },
        createContainer(obj) {
            // je créé une div spéciale
            var datasDiv = document.createElement('div');
            // je l'insère dans mon parent
            document.getElementById('textZone').appendChild(datasDiv);
            datasDiv.setAttribute("id", "datas_");
            var preventProps = this.preventProperties;
            var stringifyObject = JSON.parse(JSON.stringify(obj));

            // pour chaque propriété dans mon Objet
            Object.keys(stringifyObject).forEach(function (value, y) {
                var whatsInMyValue = stringifyObject[value];
                //je créé un span
                var datasSpan = document.createElement('span');
                // je l'ajoute dans le parent'
                document.getElementById("datas_").appendChild(datasSpan);
                // je lui ajoute une classe "générale"
                datasSpan.classList.add("attributeSpans");
                //
                datasSpan.setAttribute("id", "span_" + y);

               //prevent props to be written
                preventProps(datasSpan, value, "offers")
                preventProps(datasSpan, value, "images")
                preventProps(datasSpan, value, "review")
                preventProps(datasSpan, value, "aggregateRating")
                preventProps(datasSpan, value, "privateMode")

                //si ma donnée est un tableau
                if (Array.isArray(whatsInMyValue)) {
                    //j'ajoute un attribut data contenant, le nom de la propriété
                    datasSpan.dataset.text = value + ": ";
                  
                    for (var i = 0; i < whatsInMyValue.length; i++) {
                        Object.keys(whatsInMyValue[i]).forEach(function (arrayValue, x) {
                            //console.log(whatsInMyValue[i]);

                            // si mon objet est vide
                            if (whatsInMyValue[i][arrayValue].length < 1) {
                                datasSpan.dataset.text += "non-renseigne";
                                datasSpan.classList.add("empty");
                            }
                            //si c'est la dernière valeur je ne met pas de virgule a la fin
                            if (i == whatsInMyValue.length - 1) {
                                //j'ajoute sa valeur
                                datasSpan.dataset.text += whatsInMyValue[i][arrayValue];
                            } else {
                            // si il y'a plus qu'une seule valeur je rajoute des virgules
                                datasSpan.dataset.text += whatsInMyValue[i][arrayValue] + ", ";
                            }
                        })
                    }
                } else {
                    if (!stringifyObject[value].length) {
                        stringifyObject[value] = "non-renseigne";
                        datasSpan.classList.add("empty");
                    }
                    //pareil pour une valeur simple
                    datasSpan.dataset.text = value + ": " + stringifyObject[value];
                }
            });
        },
        getPromise(time, data) {
            var writingConteneur = document.getElementById(data.id);
            var writingContent = data.dataset.text;
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('doing my promise');

                    this.scanText(writingContent, writingConteneur);
    
                    //secondPromise=true;
                    setTimeout(() => { resolve('success') }, time + (writingContent.length * 70) );
                }, time)
            }).then((value) => {
                console.log('2nd done !');
            })
        },
        scrollUpPromise(time) {
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    document.getElementById('textZone').scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });                 
                }, time)
            })
        },
        async main(elements) {
            var promise = this.getPromise;
            var scrollUp = this.scrollUpPromise;
            var times = this.time;
            let promisesArray = [];

            for (let i = 0; i < elements.length; i++) {
                promisesArray.push(promise(times, elements[i]));
                times += 1500;
                times += elements[i].dataset.text.length * 70;

                if (i == elements.length - 1) {
                    times += 1500;
                    promisesArray.push(scrollUp(times)); 
                }
            }
            for (const element of promisesArray) {
                await element;
                //console.log(result)
            }
        }

    },
    mounted() {
        this.faxify();
        var doPromise = this.firstPromise;
        //var object = document.getElementById('myDatas').dataset.json;
        //var monObj = this.object;
        //var object = JSON.parse(JSON.stringify(monObj));
        var doGet = this.getter;
        var createContainer = this.createContainer;
        //this.addId();
        //console.log('mounted');

        document.getElementById('addBook').addEventListener('shown.bs.modal', function (e) {
            doPromise();
            //console.log(object);
            createContainer(doGet);
        });
    },
    computed: {
        getter() {
            return this.object
        },
    }
}
</script>
<template>
    <!-- confirm-addModal : beginning -->
    <div id="addBook" role="dialog"
        class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        tabindex="-1" aria-labelledby="addBook" aria-hidden="true">
        <div class="fixed inset-0 bg-secondary bg-opacity-80">
            <div class="modal-dialog">
                <div class="modal-content fixed inset-0 z-12 overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">           
                        <div class="p-7 flex max-h-18 flex-row relative transform rounded-3xl bg-white text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div type="button" @click="action()" data-bs-toggle="modal"
                                                data-bs-target="#successModal" class="w-12 cursor-pointer h-12 absolute -right-5 rounded-full bg-cyan-500 p-3">
                                <ArrowDown class="stroke-white"></ArrowDown>
                            </div>
                            <div id="margin">
                                <span class="hole"></span>
                            </div>
                            <div class="bg-white w-full min-h-full float-left sm:p-6 sm:pb-4">
                                <div class="flex flex-col">
                                    <div class="mx-auto flex mb-8 basis-full items-center justify-left">
                                        <span class="w-6 basis-1/10 ">
                                            <BookOpen class="w-6 color-primary"></BookOpen>
                                        </span>
                                        <span class="basis-9/10 pl-5">
                                            <h3 class="text-lg  font-medium leading-6 text-gray-900"
                                                id="modal-title-questionmark">Prévisualisation de la Fiche</h3>
                                        </span>
                                    </div>


                                    <div class="min-h-[350px] relative scroll book-quality-notice max-h-80 overflow-auto mt-10 sm:mt-0">
                                        <div id="textWrapper" class="absolute bottom-0">
                                                    <div id="textZone" class="font-light pt-8 max-h-96 overflow-y-scroll pr-10">
                                                     <div id="dataBind" class="font-bold"
                                                      data-text="Voilà la fiche que vous avez tapé texte super long test test je test"></div>
                                                     </div>
                                        </div>
                                        <!-- 
                                        <p class="flex justify-left mb-1">
                                            <b>Nom du Livre : </b>
                                            <span class="text-gray pl-1 font-extralight">{{ object.bookName }}</span>
                                        </p>

                                        <p class="flex justify-left mb-1">
                                            <b>Auteur.s : </b>
                                            <span 
                                            v-for="author in object.authors" 
                                            class="pl-1 text-gray font-extralight">
                                                {{ author.name }},
                                            </span>
                                        </p>
                                        
                                        <p class="flex justify-left mb-1">
                                            <b>Illustrateur.s :</b>
                                            <span 
                                            v-for="illustrator in object.illustrators" 
                                            class="pl-1 text-gray font-extralight">
                                                    {{ illustrator.name }},
                                            </span>
                                        </p>

                                        <p class="flex justify-left mb-1">
                                            <b>Format du livre : </b>
                                        <span class="pl-1 text-gray font-extralight">
                                            {{ object.bookFormat }}
                                        </span>
                                        </p>

                                        <p class="flex justify-left mb-1">
                                            <b>Date de Publication : </b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.datePublished }}
                                            </span>
                                        </p>

                                        <p class="flex justify-left mb-1">
                                            <b>Language : </b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.inLanguage }}
                                            </span>
                                        </p>

                                        <p class="flex justify-left mb-1">
                                            <b>ISBN : </b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.isbn }}
                                            </span>
                                        </p>

                                        <p class="flex justify-left mb-1">
                                            <b>Synopsis bref : </b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.briefSynopsis }}
                                            </span>
                                        </p>

                                        <p class="flex justify-left mb-1">
                                            <b>Synopsis long : </b>
                                        <span class="text-gray pl-1 font-extralight">
                                            {{ object.longSynopsis }}
                                        </span>
                                        </p>
                                        <p class="flex justify-left mb-1">
                                            <b>Genre : </b>
                                        <span class="text-gray pl-1 font-extralight">
                                            {{ object.genre }}
                                        </span>
                                        </p>

                                        <p class="flex justify-left mb-1">
                                            <b>Qualité du livre : </b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.bookQuality }}
                                            </span>
                                        </p>
                                        <p class="flex justify-left mb-1">
                                            <b>Nombre de pages : </b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.numberOfPages }}
                                            </span>
                                        </p>
                                        <p class="flex justify-left mb-1">
                                            <b>Notice des droits : </b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.copyrightNotice }}
                                            </span>
                                        </p>
                                        <p class="flex justify-left mb-1">
                                            <b>Propriétaire des droits : </b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.copyrightHolder }}
                                            </span>
                                        </p>
                                        <p class="flex justify-left mb-1">
                                            <b>Editeur : </b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.publisher }}
                                            </span>
                                        </p>
                                        <p class="flex justify-left mb-1">
                                            <b>Prix proposé : </b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.offers.price }}
                                            </span>
                                        </p>
    
                                        <p class="flex justify-left mb-1">
                                            <b>Convient à un public jeune :</b>
                                        <span class="text-gray pl-1 font-extralight">
                                            {{ object.isFamilyFriendly }}
                                        </span>
                                        </p>

                                        <p class="flex justify-left mb-1">
                                            <b>Fait partie d'une collection ? :</b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.isCollection }}
                                            </span>
                                        </p>

                                        <p :v-show="object.objectIsCollection" class="flex justify-left mb-1">
                                            <b>Est-ce une collection personelle ? :</b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.isPersonalCollection }}
                                            </span>
                                        </p>

                                        <p :v-show="object.objectIsCollection" class="flex justify-left mb-1">
                                            <b>Nom de la collection ? :</b>
                                            <span class="text-gray pl-1 font-extralight">
                                                {{ object.collectionName }}
                                            </span>
                                        </p> -->

                                        <!-- à ajouter pour faire apparaitre popup de réussite =>   data-bs-toggle="modal" data-bs-target="#taskModal" -->

                                        <!-- <div class="mt-10 flex h-15 gap-4 place-content-center">
                                            <button type="button" @click="action()" data-bs-toggle="modal"
                                                data-bs-target="#successModal"
                                                class="bg-primary hover:shadow-button text-white p-2 rounded-3xl">
                                                Sauvegarder
                                            </button>
                                        </div>
                                        <div class="taskModalButton mt-5 mb-10 flex h-15 gap-4 place-content-center">
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#taskModal"
                                                class="basis-1/4 hover:shadow-button text-gray p-2 rounded-3xl border border-solid border-gray-light">
                                                Annuler
                                            </button>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- confirm-addModal : ends -->
</template>
<style>
#dataBind{
    font-family: Courier, 'Courier New', Courier, monospace;
}

#margin {
    display: flex;
    flex-flow: column;
    float: left;
    padding-right: 4px;
    margin-right: 10px;
    min-height: 100%;
    width: 39px;
    background-color: white;
    border-right: 1px solid grey;
}

.attributeSpans {
    display: block;
    width: 100%;
    font-family: Courier, 'Courier New', Courier, monospace;
}

.attributeSpans.empty {
    color: red;
}

.hole {
    display: block;
    margin: 5px 0;
    width: 15px;
    max-width: 15px;
    height: 15px;
    min-height: 15px;
    border-radius: 50%;
    background-color: skyblue;
}
</style>