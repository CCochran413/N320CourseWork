Vue.component("student-card", {
    props: ["student", "isactive"],
    template:"<div class='student' v-bind:class='{cardActive:isactive}'>{{student.name}} : {{student.skill}}</div>",
})


var app = new Vue({
    el: "#app",
    data: {
        students:[
            { name: "Red", skill : 2, joy: 0},
            { name: "blue", skill : 1, joy: 4},
            { name: "green", skill : 5, joy: 9},
        ],
        currentStudent: { name: "Red", skill : 2, joy: 0},
        currentStudentId:0,
        cardActive: true,
    },
    methods:{
        arrowClicked: function(){
            if(event.target.classList.contains("arrow2")){
                this.currentStudentId--;
            }else {
                this.currentStudentId++;
            }
            // this.currentStudentId  ++;
            // this.currentStudent = this.students[this.currentStudentId]
            if(this.currentStudentId>= this.students.length){
                this.currentStudentId = 0;
            } else if(this.currentStudentId<0){
                this.currentStudentId = this.students.length - 1;
            }
            this.currentStudent = this.students[this.currentStudentId];
            this.cardActive= ! this.cardActive;
           
            //how do you update currentStudent to point ot the next student?
            //how do you make sure the at it loops?
        
        }
        
    }
    
})