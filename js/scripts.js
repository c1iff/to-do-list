//buisness logic
var itemDates = [];
function toDoObjects() {
  this.getTally = function() {
    var tally = 0;
    itemDates.forEach(function(item) {
      if (toDoObjects[item].done) {
        tally++;
      }
    });
  return tally;
  }
}
var toDoObjects = new toDoObjects();

function toDoItem(task, dueDate) {
  this.task = task;
  this.dueDate = dueDate;
  this.done = false;
}

toDoItem.prototype.isDone = function () {
  if (this.done === false) {
    this.done = true;
  } else {
    this.done = false;
  }
};

// toDoObjects.prototype.getTally = function() {
//   var tally = 0;
//   itemDates.forEach(function(item) {
//     if (toDoObjects[item].done) {
//       tally++;
//     }
//   });
//   return tally;
// };


$(document).ready(function() {
  var undoneTally = 0;
  $("#undone-tally").text(undoneTally);
  $("form").submit(function(event) {
    console.log(toDoObjects);
    console.log(itemDates);
    undoneTally++;
    $("#undone-tally").text(undoneTally);
    event.preventDefault();
    var task = $("#new-task").val();
    var date = $("#new-due-date").val();

    toDoObjects[date] = new toDoItem(task, date);
    itemDates.push(date);
    itemDates.sort();
    console.log(toDoObjects.getTally());

    $("#output ul").text("");

    itemDates.forEach(function(date) {
      console.log(toDoObjects, toDoObjects[date]);
      $("#output ul").append('<li class="task-output"><label><input type="checkbox"> ' + toDoObjects[date].task + "</label></li>" )

      $("#output form :checkbox").last().change(function() {
        console.log("test");
        toDoObjects[date].isDone();
        if (this.checked) {
          $(this).parent().addClass("done");
          console.log(toDoObjects[date].done);
        } else {
          $(this).parent().removeClass("done");
          console.log(toDoObjects[date].done);
        }
        undoneTally = 0;
        $("#output form :checkbox").each(function() {
          if (!this.checked) {
            undoneTally++;
          }
        })
        $("#undone-tally").text(undoneTally);
      });
    });
  })
})
