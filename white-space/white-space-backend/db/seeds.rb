# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
routines = Routine.create([{title: 'Sunday morning routine'}, {title: 'Monday morning routine'}, {title: 'Wednesday evening routine'}, {title: 'Saturday night routine'}])
todos = Todo.create([{name: 'Cleaning', duration: '25', routine_id: 1 }, {name: 'Study', duration: '25', routine_id: 1 }, {name: 'Laundry', duration: '15', routine_id: 1 }, {name: 'Reading', duration: '20', routine_id: 1 },
  {name: 'Cleaning', duration: '25', routine_id: 2 }, {name: 'Study', duration: '25', routine_id: 2 }, {name: 'Laundry', duration: '15', routine_id: 2 }, {name: 'Reading', duration: '20', routine_id: 2 },
  {name: 'Cleaning', duration: '25', routine_id: 3 }, {name: 'Study', duration: '25', routine_id: 3 }, {name: 'Laundry', duration: '15', routine_id: 3 }, {name: 'Reading', duration: '20', routine_id: 3 },
  {name: 'Cleaning', duration: '25', routine_id: 4 }, {name: 'Study', duration: '25', routine_id: 4 }, {name: 'Laundry', duration: '15', routine_id: 4 }, {name: 'Reading', duration: '20', routine_id: 4 }])
