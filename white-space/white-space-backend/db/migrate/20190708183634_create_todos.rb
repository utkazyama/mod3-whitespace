class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.string :name
      t.string :duration
      t.references :routine, foreign_key: true

      t.timestamps
    end
  end
end
