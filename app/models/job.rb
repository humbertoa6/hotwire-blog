class Job < ApplicationRecord
  belongs_to :account
  has_rich_text :description
  validates_presence_of :title, :status, :job_type, :location

  enum :status, draft: 1, open: 2, closed: 3
  enum :job_type, full_time: 1, part_time: 2
end