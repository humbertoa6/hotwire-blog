class CreateJobs < ActiveRecord::Migration[8.1]
  def change
    create_table :jobs, id: :uuid do |t|
      t.string :title
      t.string :location
      t.integer :status
      t.integer :job_type
      t.references :account, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
    add_index :jobs, :status
    add_index :jobs, :job_type
  end
end