import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild("mcq_slides") mcq_slides: Slides;
  mcq_questions: Array<any>;
  results: Array<any> = [];
  constructor(public navCtrl: NavController) {
    this.mcq_questions = this.getMcq();
  }
  ionViewDidLoad() {
    this.mcq_slides.lockSwipes(true);
    this.mcq_slides.paginationType = "progress";
  }
  onOptionselect(mcq,choice) {
    choice.selected = !choice.selected;
    mcq.next_enabled = false;
    mcq.choices.forEach(cho => {
      if (cho.selected) { 
        mcq.next_enabled = true;
    }
    });
  }
  goToNextQuestion() {
    this.mcq_slides.lockSwipes(false);
    this.calculateResult();
    this.mcq_slides.slideNext();
    this.mcq_slides.lockSwipes(true);
  }
  calculateResult() {
    this.results = [];
    this.mcq_questions.forEach(mcq => {
      let result = new Object();
      result['question'] = mcq.question;
      mcq.choices.forEach(choice => {
        if (choice.selected) {
          result['answer'] = choice.name;
          result['correct'] = choice.correct;
        }
      });
      this.results.push(result);
    });
  }
  restartQuiz() {
    this.mcq_questions = this.getMcq();
    this.mcq_slides.lockSwipes(false);
    this.mcq_slides.slideTo(0, 1000);
    this.mcq_slides.lockSwipes(true);
  }
  getMcq() {
    return [
      {
        question: "What is the release year of Iron Man First Sequal (Film)?",
        choices: [
          {
            name: "2006",
            selected: false,
            correct: false,
          },
          {
            name: "2007",
            selected: false,
            correct: false,
          },
          {
            name: "2008",
            selected: false,
            correct: true,
          }
        ]
      },
      {
        question: "What character does Robert Downey jr. play in marvel universe?",
        choices: [
          {
            name: "Thor",
            selected: false,
            correct: false,
          },
          {
            name: "Iron Man",
            selected: false,
            correct: true,
          },
          {
            name: "Captin America",
            selected: false,
            correct: false,
          }
        ]
      },
      {
        question: "Black widow Character is Played by",
        choices: [
          {
            name: "Brie Larson",
            selected: false,
            correct: false,
          },
          {
            name: "Natalie Portman",
            selected: false,
            correct: false,
          },
          {
            name: "Scarlett Johansson",
            selected: false,
            correct: true,
          }
        ]
      }
    ];
  }
}
