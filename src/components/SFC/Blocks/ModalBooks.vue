<script lang="ts" setup>
// Bibliothèques
import Tagify from '@yaireo/tagify' // Tagify JS
import '@yaireo/tagify/dist/tagify.css' // Tagify CSS
import 'tw-elements'

// Components
import SuccessModal from '../Modal/SuccessModal.vue'
import ConfirmModal from '../Modal/ConfirmModal.vue'
// Icones
import BookOpen from '../../Icons/BookOpen.vue'
import TaskIcon from '../../Icons/TaskIcon.vue'
import QuestionMark from '../../Icons/QuestionMark.vue'
</script>

<script lang="ts">
export default {
  mounted() {
    this.tagify()
  },
  data() {
    return {
      book: [
        {
          bookName: '',
          authors: [{ name: '' }],
          illustrators: [{ name: '' }],
          bookFormat: '',
          datePublished: '',
          images: [
            {
              alt: '',
              src: '',
            },
          ],
          inLanguage: '',
          isbn: '',
          briefSynopsis: '',
          longSynopsis: '',
          genre: '',
          bookQuality: '',
          numberOfPages: '',
          dateOfAddition: '',
          copyrightNotice: '',
          copyrightHolder: '',
          isCollection: false,
          isPersonalCollection: false,
          collectionName: '',
          isFamilyFriendly: true,
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            price: '',
            priceCurrency: 'euros',
          },
          publisher: '',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '',
            reviewCount: '',
          },
          review: [
            {
              '@type': 'Review',
              author: '',
              datePublished: '',
              name: '',
              reviewBody: '',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '',
              },
            },
          ],
          privateMode: ''
        },
      ],
      success: 'Bravo ! La fiche est enregistrée !',
      oops: "Oops ! Quelque chose s'est mal passé, veuillez réessayer plus tard !",
      isMobile: false,
      desktopClass:
        'flex px-32 py-10 inset-0 justify-center items-center bg-secondary',
      mobileClass: 'flex flex-col relative bg-secondary',
      isError: true,
      dataSaved: false,
    }
  },
  computed: {
    classObject() {
      return {
        error: !this.isError
      }
    },
  },
  methods: {
    getDate() {
      var today = new Date()
      var dateToday = String(today.getDate())
      return dateToday
    },
    checkISBN($) {
      var booleanResult
      var isbnValue = $.target.value
      var re = /^\d{10,13}$/
      booleanResult = re.test(isbnValue)
      var lettersRegex = /[a-zA-Z]+/g
      var isItLetters = lettersRegex.test(isbnValue)
      if (isItLetters) {
        this.book[0].isbn = ''
      }
      this.isError = booleanResult
    },
    checkPrice($) {
      var booleanResult
      var priceValue = $.target.value
      var re = /^\d+(,\d{1,2})?$/
      booleanResult = re.test(priceValue)
      var lettersRegex = /[a-zA-Z]+/g
      var isItLetters = lettersRegex.test(priceValue)
      if (isItLetters) {
        this.book[0].offers.price = ''
      }
      this.isError = booleanResult
    },
    add() {
      this.book.push({
        bookName: this.book['bookName'],
        genre: this.book['genre'],
        datePublished: this.book['datePublished'],
        images: this.book['images'],
        inLanguage: this.book['inLanguage'],
        isbn: this.book['isbn'],
        briefSynopsis: this.book['briefSynopsis'],
        longSynopsis: this.book['longSynopsis'],
        bookQuality: this.book['bookQuality'],
        numberOfPages: this.book['numberOfPages'],
        copyrightNotice: this.book['copyrightNotice'],
        copyrightHolder: this.book['copyrightHolder'],
        publisher: this.book['publisher'],
        authors: this.book['authors'],
        illustrators: this.book['illustrators'],
        bookFormat: this.book['bookFormat'],
        dateOfAddition: this.book['dateOfAddition'],
        isCollection: this.book['isCollection'],
        isPersonalCollection: this.book['isPersonalCollection'],
        collectionName: this.book['isCollectionName'],
        isFamilyFriendly: this.book['isFamilyFriendly'],
        offers: this.book['offers'],
        aggregateRating: this.book['aggregateRating'],
        review: this.book['review'],
        privateMode : this.book['privateMode']
      })
    },
    tagify() {
      // The DOM element you wish to replace with Tagify
      var authorsInput = document.querySelector('input[name=authors]')
      var illustratorsInput = document.querySelector('input[name=illustrators]')
      var selectQuality = document.querySelector(
        'input[name=tags-select-quality]'
      )
      var selectGenre = document.querySelector('input[name=tags-select-genre]')
      var select = document.querySelector('input[name=tags-select-mode]')

      // initialize Tagify on the above input node reference
      var tagifyAuthors = new Tagify(authorsInput)
      var tagifyIllustrators = new Tagify(illustratorsInput)
      var tagifySelect = new Tagify(select, {
        enforceWhitelist: true,
        mode: 'select',
        whitelist: [
          'Livre de Poche',
          'Couverture Rigide',
          'Livre électronique',
          'Livre Audio',
        ],
      })
      var tagifySelectBookStyle = new Tagify(selectGenre, {
        enforceWhitelist: true,
        dropdown: {
          maxItems: 3,
        },
        mode: 'select',
        whitelist: [
          'Roman',
          'Langues/Linguistique',
          'Biographie',
          'Roman graphique',
          'BD',
          'Historique',
          'Fantastique',
          'Science-Fiction',
          'Nouvelles',
          'Dictionnaire',
          'Conte',
          'Enfant',
          'Heroïc-Fantaisy',
          'Epouvante',
          'Policier',
          'Sciences-Humaines',
          'Sciences Sociale',
          'Religion',
          'Esotérie',
          'Psychologie',
          'Informatique',
          'Droit',
          "Livre d'Art",
          'Beaux-livres',
          'Architecture',
          'Livres lus',
          'Poésie',
          'Philosophie',
          'Cuisine',
          'Humour',
          'Erotique',
          'Coffret/Anthologie',
          'Sciences',
        ],
      })
      var tagifyQuality = new Tagify(selectQuality, {
        enforceWhitelist: true,
        mode: 'select',
        whitelist: ['A++', 'A+', 'A', 'B', 'C'],
      })
      //create Instance
      tagifyAuthors
      tagifyIllustrators
      tagifySelect
      tagifySelectBookStyle
      tagifyQuality

      //bind the data trees with fresh tagify data
      var bookObject = this.book

      var authorsObject = bookObject[0].authors
      tagifyAuthors.on('add', function (e) {
        if (authorsObject[0]['name'] == '') {
          authorsObject[0]['name'] = e.detail.data.value
        } else {
          authorsObject.push({ name: e.detail.data.value })
        }
      })

      var illustratorsObject = bookObject[0].illustrators
      tagifyIllustrators.on('add', function (e) {
        if (illustratorsObject[0]['name'] == '') {
          illustratorsObject[0]['name'] = e.detail.data.value
        } else {
          illustratorsObject.push({ name: e.detail.data.value })
        }
      })

      var selectObject = this.book[0]
      tagifySelect.on('add', function (e) {
        selectObject['bookFormat'] = e.detail.data.value
      })

      tagifySelectBookStyle.on('add', function (e) {
        selectObject['genre'] = e.detail.data.value
      })

      tagifyQuality.on('add', function (e) {
        selectObject['bookQuality'] = e.detail.data.value
      })
    },
    saveFile() {
      const data = JSON.stringify(this.book)
      const computedData = this
      const blob = new Blob([data], { type: 'text/plain' })
      const a = document.createElement('a')
      const event = new Event('click')

      // On écoute l'évènement
      a.addEventListener(
        'click',
        function (e) {
          a.download = 'test.json'
          a.href = window.URL.createObjectURL(blob)
          a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
          computedData.dataSaved = true
        },
        false
      )

      a.dispatchEvent(event)
      a.click()
    },
  },
  components: {
    SuccessModal,
    ConfirmModal,
  },
}

//to do input with control on de-focus to match regex
</script>
<template>
  <!-- bookForm modal  : begins -->
  <div
    id="taskModal"
    role="dialog"
    class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    tabindex="-1"
    aria-labelledby="taskModal"
    aria-hidden="true"
  >
    <div class="fixed inset-0 bg-secondary bg-opacity-80 blur-2xl"></div>
    <div class="modal-dialog">
      <div class="modal-content fixed inset-0 z-20 overflow-y-auto">
        <div
          class="flex items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="p-7 relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div class="bg-white sm:p-6 sm:pb-4">
              <div class="flew flex-row">
                <div
                  class="mx-auto flex mb-8 basis-full items-center justify-left"
                >
                  <span class="w-6 basis-1/10">
                    <TaskIcon class="w-6 fill-primary"></TaskIcon>
                  </span>
                  <span class="basis-9/10 pl-5">
                    <h3
                      class="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Ajouter un Livre
                    </h3>
                  </span>
                </div>

                <div class="max-h-80 overflow-auto mt-10 sm:mt-0">
                  <div class="mt-5 md:col-span-2 md:mt-0">
                    <!-- begin FORM -->
                    <form id="formBook" role="form" action="#" method="POST">
                      <!-- begin OVERFLOW—HIDDEN -->
                      <!-- begin bookName -->
                      <div class="overflow-hidden">
                        <div>
                          <div>
                            <div class="col-span-1 mb-5">
                              <label
                                for="bookName"
                                class="block text-m font-light text-gray"
                                >Nom du livre
                              </label>
                              <input
                                type="text"
                                v-model="book[0].bookName"
                                name="bookName"
                                id="book-name"
                                autocomplete="Titre"
                                class="standard-input mt-1 p-2.5 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end bookName -->
                      <!-- begin Author(s) -->
                      <div class="overflow-hidden">
                        <div>
                          <div>
                            <div class="col-span-1 mb-5">
                              <label
                                for="authors"
                                class="block text-m font-light text-gray"
                                >Auteur(s) du livre</label
                              >
                              <input
                                autofocus="false"
                                :v-bind="book[0].authors[0].name"
                                type="text"
                                name="authors"
                                id="authors"
                                autocomplete="Auteurs"
                                class="mt-1 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end Author(s) -->
                      <!-- begin Illustrators(s) -->
                      <div class="overflow-hidden">
                        <div>
                          <div>
                            <div class="col-span-1 mb-5">
                              <label
                                for="illustrators"
                                class="block text-m font-light text-gray"
                                >Illustrateur(s)</label
                              >
                              <input
                                type="text"
                                :v-bind="book[0].illustrators[0].name"
                                name="illustrators"
                                id="illustrators"
                                autocomplete="Illustrateur(s)"
                                class="mt-1 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end Illustrator(s) -->
                      <!-- begin genre -->
                      <div class="overflow-hidden">
                        <div>
                          <div>
                            <div class="col-span-1 ml-1 mb-5">
                              <label
                                for="genre"
                                class="block text-m font-light text-gray"
                                >Genre</label
                              >
                              <input
                                :v-bind="book[0].genre"
                                name="tags-select-genre"
                                class="selectMode mt-1 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                                placeholder="Veuillez choisir"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end genre -->
                      <!-- begin Format(s) -->
                      <div class="overflow-hidden">
                        <div>
                          <div>
                            <div class="col-span-1 mb-5">
                              <label
                                for="bookFormat"
                                class="block text-m font-light text-gray"
                                >Format de l'ouvrage</label
                              >
                              <input
                                :v-bind="book[0].bookFormat"
                                name="tags-select-mode"
                                class="selectMode mt-1 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                                placeholder="Veuillez choisir"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end Formats(s) -->
                      <!-- begin datePublished-->
                      <div class="overflow-hidden">
                        <div>
                          <div>
                            <div class="col-span-1 mb-5">
                              <label
                                for="datePublished"
                                class="block text-m font-light text-gray"
                                >Date de Publication</label
                              >
                              <input
                                type="date"
                                v-model="book[0].datePublished"
                                name="datePublished"
                                id="date-published"
                                autocomplete=""
                                class="mt-1 p-2 block font-light font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end datePublished -->
                      <!-- begin isbn -->
                      <div class="overflow-hidden">
                        <div>
                          <div>
                            <div class="col-span-1 mb-5">
                              <label
                                for="isbn"
                                class="block text-m font-light text-gray"
                                >numéro ISBN (10 à 13 chiffres)</label
                              >
                              <input
                                :class="classObject"
                                v-on:input="checkISBN($event)"
                                v-model="book[0].isbn"
                                type="text"
                                name="isbn"
                                id="isbn"
                                class="mt-1 p-2.5 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end isbn -->
                      <!-- begin publisher -->
                      <div>
                        <div>
                          <div class="col-span-1 mb-5">
                            <label
                              for="publisher"
                              class="block text-m font-light float-left text-gray"
                            >
                              Editeur : {{ book[0].publisher }}
                            </label>
                            <input
                              v-model="book[0].publisher"
                              type="text"
                              name="publisher"
                              id="publisher"
                              class="mt-1 p-2.5 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <!-- end publisher -->
                      <!-- begin briefSynopsis -->
                      <div class="overflow-hidden">
                        <div>
                          <div>
                            <div class="col-span-1 mb-5">
                              <label
                                for="synopsis-bref"
                                class="block text-m font-light text-gray"
                                >Bref Synopsis</label
                              >
                              <textarea
                                v-model="book[0].briefSynopsis"
                                type="text"
                                name="briefSynopsis"
                                id="brief-synopsis"
                                class="mt-1 p-2.5 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end briefSynopsis -->
                      <!-- begin longSynopsis -->
                      <div>
                        <div>
                          <div class="col-span-1 mb-5">
                            <label
                              for="synopsis-lg"
                              class="block text-m font-light text-gray"
                              >Synopsis Complet</label
                            >
                            <textarea
                              v-model="book[0].longSynopsis"
                              type="text"
                              name="longSynopsis"
                              id="long-synopsis"
                              autocomplete="0 000000 000000"
                              class="mt-1 p-2.5 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <!-- end longSynopsis -->
                      <!-- begin bookQuality -->
                      <div class="overflow-hidden">
                        <div>
                          <div>
                            <div class="col-span-1 mb-5">
                              <label
                                for="etat"
                                class="block text-m font-light float-left text-gray"
                                >État du Livre
                              </label>
                              <span
                                data-bs-toggle="modal"
                                data-bs-target="#infoModal"
                                ><QuestionMark
                                  class="text-gray h-5 ml-1 z-index-9 w-5 float-left"
                                ></QuestionMark
                              ></span>

                              <span class="block clear-both"></span>
                              <input
                                :v-bind="book[0].bookQuality"
                                name="tags-select-quality"
                                class="selectMode mt-1 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                                placeholder="Veuillez choisir"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end bookQuality -->
                      <!-- begin numberOfPages -->
                      <div>
                        <div>
                          <div class="col-span-1 mb-5">
                            <label
                              for="numberOfPages"
                              class="block text-m font-light float-left text-gray"
                              >Nombre de Pages</label
                            >
                            <input
                              v-model="book[0].numberOfPages"
                              type="number"
                              name="numberOfPages"
                              id="number-of-pages"
                              class="mt-1 p-2.5 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <!-- end numberOfPages -->
                      <!-- begin copyright notice -->
                      <div>
                        <div>
                          <div class="col-span-1 mb-5">
                            <label
                              for="copyrightNotice"
                              class="block text-m font-light float-left text-gray"
                              >Droit d'auteurs et/ou Licence de Droits</label
                            >
                            <textarea
                              v-model="book[0].copyrightNotice"
                              type="text"
                              name="copyrightNotice"
                              id="copyright-notice"
                              class="mt-1 p-2.5 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <!-- end copyright notice -->
                      <!-- begin copyright holder -->
                      <div>
                        <div>
                          <div class="col-span-1 mb-5">
                            <label
                              for="copyrightHolder"
                              class="block text-m font-light float-left text-gray"
                              >Année et propriétaire.s des derniers droits
                              d'auteur</label
                            >
                            <input
                              v-model="book[0].copyrightHolder"
                              type="text"
                              name="copyrightHolder"
                              id="copyright-holder"
                              class="mt-1 p-2.5 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <!-- end copyright holder -->
                      <!-- begin isFamilyFriendly -->
                      <div>
                        <div>
                          <div class="col-span-1 mb-5">
                            <label
                              for="isFamilyFriendly"
                              class="block text-m font-light float-left text-gray"
                              >Ce livre convient-il aux enfants ? :
                              {{ book[0].isFamilyFriendly }}
                            </label>
                            <label
                              class="h-8 flex flex-row clear-both"
                              for="oui"
                            >
                              <span
                                class="w-8 block font-thin text-gray self-center"
                                >Oui</span
                              >
                              <input
                                name="isFamilyFriendly"
                                v-model="book[0].isFamilyFriendly"
                                type="checkbox"
                                id="itsFamilyFriendly"
                                class="w-4 accent-pink-500 ml-3 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                                value="Oui"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <!-- end isFamilyFriendly -->
                      <!-- begin isCollection -->
                      <div>
                        <div>
                          <div class="col-span-1 mb-5">
                            <label
                              for="isCollection"
                              class="block text-m font-light float-left text-gray"
                            >
                              Ce livre est-il issu d'une collection ?
                              {{ book[0].isCollection }}
                            </label>
                            <!-- checkbox -->
                            <label
                              class="h-8 flex flex-row clear-both"
                              for="oui"
                            >
                              <span
                                class="w-8 block font-thin text-gray self-center"
                                >Oui</span
                              >
                              <input
                                v-model="book[0].isCollection"
                                :aria-checked="book[0].isCollection"
                                name="isCollection"
                                id="itsCollection"
                                type="checkbox"
                                role="checkbox"
                                class="w-4 accent-pink-500 ml-3 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <!-- end isCollection -->
                      <!-- begin isPersonnalCollection -->
                      <div v-show="book[0].isCollection">
                        <div>
                          <div class="col-span-1 mb-5">
                            <label
                              for="isPersonalCollection"
                              class="block text-m font-light float-left text-gray"
                            >
                              Ce livre est-il issu d'une collection personelle ?
                              : {{ book[0].isPersonalCollection }}
                            </label>
                            <!-- checkbox yes -->
                            <label
                              class="h-8 flex flex-row clear-both"
                              for="oui"
                            >
                              <span
                                class="w-8 block font-thin text-gray self-center"
                                >Oui</span
                              >
                              <input
                                v-model="book[0].isPersonalCollection"
                                :aria-checked="book[0].isPersonalCollection"
                                name="personalCollection"
                                type="checkbox"
                                role="checkbox"
                                id="itsPersonalCollection"
                                class="w-4 accent-pink-500 ml-3 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <!-- end isPersonalCollection -->
                      <!-- begin collectionName -->
                      <div v-show="book[0].isCollection">
                        <div>
                          <div class="col-span-1 mb-5">
                            <label
                              for="isCollection"
                              class="block text-m font-light float-left text-gray"
                            >
                              Nom de la Collection :
                              {{ book[0].collectionName }}
                            </label>
                            <input
                              v-model="book[0].collectionName"
                              type="text"
                              name="collectionName"
                              id="collection-name"
                              class="mt-1 p-2.5 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <!-- end collectionName -->
                      <!-- begin Price offer -->
                      <div>
                        <div>
                          <div class="col-span-1 mb-5">
                            <label
                              for="offerPrice"
                              class="block text-m font-light float-left text-gray"
                              >Prix proposé en euros (centimes séparés par une
                              virgule)</label
                            >
                            <input
                              v-model="book[0].offers.price"
                              :class="classObject"
                              v-on:input="checkPrice($event)"
                              type="text"
                              placeholder="€"
                              name="offerPrice"
                              id="offer-price"
                              class="mt-1 p-2.5 block font-thin text-black w-full rounded-lg border border-gray-light border-solid focus:border-primary focus:outline-none focus:border-solid focus:border-2 focus:rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <!-- end Price Offer -->
                      <!-- BUTTONS BEGINS-->
                      <div
                        class="taskModalButton mt-10 mb-10 flex h-15 gap-4 place-content-center"
                      >
                        <button
                          type="button"
                          v-on:click="add()"
                          data-bs-toggle="modal"
                          data-bs-target="#addBook"
                          class="bg-primary hover:shadow-button basis-1/4 text-white p-2 rounded-3xl"
                        >
                          Ajouter
                        </button>

                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          class="basis-1/4 hover:shadow-button text-gray p-2 rounded-3xl border border-solid border-gray-light"
                        >
                          Fermer
                        </button>
                      </div>
                      <!-- END BUTTON -->
                    </form>
                    <!-- END FORM -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- bookForm modal : ends -->
  <!-- qualityModal : beginning -->
  <div
    id="infoModal"
    role="dialog"
    class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    tabindex="-1"
    aria-labelledby="infoModal"
    aria-hidden="true"
  >
    <div class="fixed inset-0 bg-secondary bg-opacity-80">
      <div class="modal-dialog">
        <div class="modal-content fixed inset-0 z-12 overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <div
              class="p-7 max-h-18 relative transform overflow-hidden rounded-3xl bg-white text-left transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white sm:p-6 sm:pb-4">
                <div class="flex flex-col">
                  <div
                    class="mx-auto flex mb-8 basis-full items-center justify-left"
                  >
                    <span class="w-6 basis-1/10">
                      <BookOpen class="w-6 color-primary"></BookOpen>
                    </span>
                    <span class="basis-9/10 pl-5">
                      <h3
                        class="text-lg font-medium leading-6 text-gray-900"
                        id="modal-title-questionmark"
                      >
                        Etat du livre
                      </h3>
                    </span>
                  </div>

                  <div
                    class="book-quality-notice max-h-80 overflow-auto mt-10 sm:mt-0"
                  >
                    <p><b>Livres neufs (A++)</b></p>
                    <p class="text-gray font-extralight">
                      Ils n'ont jamais été lus et sont en parfait état et sans
                      aucune marque.
                    </p>
                    <p><b>Livres d'occasion comme neuf (A+) : </b></p>
                    <p class="text-gray font-extralight">
                      Bien qu'il ait pu être lu, votre livre ne comporte aucune
                      marque et à l'aspect d'un livre neuf. La jaquette et la
                      couverture sont en parfait état. Les pages sont ne sont ni
                      tachées, ni marquées, et ne contiennent aucune note.
                    </p>
                    <p><b>Livres d'occasion très bon état (A) : </b></p>
                    <p class="text-gray font-extralight">
                      Le livre a été lu mais il est toujours en très bon état.
                      Les éventuelles marques, très peu nombreuses, sont à peine
                      visibles. Les pages sont ne sont pas tachées et ne
                      contiennent aucune note. Le dos ne comporte aucune marque.
                    </p>
                    <p><b>Livres d'occasion bon état (B) : </b></p>
                    <p class="text-gray font-extralight">
                      Le livre n'est pas abîmé bien qu'il présente quelques
                      marques d'usure. Aucune page ne manque. La couverture et
                      la jaquette le cas échéant ne sont pas endommagées. Il se
                      peut que le dos soit un peu marqué.
                    </p>
                    <p><b>Livres d'occasion état correct (C) : </b></p>
                    <p class="text-gray font-extralight">
                      L'intégralité du livre peut être lue malgré la présence
                      possibles de notes en marge ou de passages surlignés. La
                      couverture et toutes les pages sont présentes. Il se peut
                      toutefois que la jaquette manque. Le livre peut venir
                      d'une bibliothèque personnelle et porter des tampons.
                    </p>
                    <p>
                      <i class="text-primary font-thin"
                        >l'integralite de ce texte est issu du site suivant:
                        <a href="https://www.labouquinerieplus.com"
                          >https://www.labouquinerieplus.com</a
                        ></i
                      >
                    </p>

                    <div
                      class="taskModalButton mt-10 mb-10 flex h-15 gap-4 place-content-center"
                    >
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#taskModal"
                        class="basis-1/4 hover:shadow-button text-gray p-2 rounded-3xl border border-solid border-gray-light"
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- qualityModal : ends -->
  <ConfirmModal :action="saveFile" :object="book[0]"> </ConfirmModal>
  <!-- successModal : beginning -->
  <SuccessModal :successText="dataSaved ? success : oops"></SuccessModal>

  <!-- successModal : ends -->
</template>
<style>
input.error {
  border: 2px solid red;
  color: red;
}
.book-quality-notice > b,
.book-quality-notice > p {
  text-align: center;
}
.book-quality-notice > p.text-gray {
  text-align: center;
  margin-bottom: 15px;
}
</style>
