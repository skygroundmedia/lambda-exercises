require 'rubygems'
#This is the AWS SDK
require 'aws/s3'
#THis is the tool that lets do you bash-like commands
require 'fileutils'
#THis is simply for demonstration purposes
require 'time'
#This is simply for the demo
require 'json'

#THis is just a class that focuses on creating functions that are based on bash commands
#
#
class CopyUtil
  APP_ROOT   = File.dirname(__FILE__)
  OUTPUT_DIR = "uploads"
  EC2_DIR    = "ec2"

  #A. This is the first command fired when the class is started
  def initialize
    create_output_directory
  end 

  #B. Create a directory 
  def create_output_directory
    #
    FileUtils.rm_rf( EC2_DIR )
    FileUtils.rm_rf( OUTPUT_DIR )
    #Create a /JSON directory
    Dir.mkdir( OUTPUT_DIR )
    #Make it platform independent
    $:.unshift( File.join(APP_ROOT, OUTPUT_DIR ) )
  end
    
  #Create a blank file
  def create_file(file_name, file_content)
    @file_type = ".json"
    @mode = "w"
    @output = File.new( OUTPUT_DIR + "/" + "#{file_name}" + @file_type, @mode)
    @output.puts file_content
  end
  
  #C. Copy the directory
  def copy_files
    FileUtils.cp_r(OUTPUT_DIR + "/.", EC2_DIR)
  end
end

#This class is simply design for demo
class JSONUtil
  def create(key, value)
    { "#{key}" => "#{value}:#{get_timestamp}" }.to_json
  end
    
  def get_timestamp
    Time.now.utc.iso8601
  end
end


#include a library
include AWS::S3
#Create an S3 connection
AWS::S3::Base.establish_connection!(:access_key_id => "123",
                                    :secret_access_key => "abc",
                                    :server => "localhost",
                                    :port => "4567")

# Get the name of th ebucket
my_first_bucket = 'myFirstBucket'

#Create the bucket
Bucket.create(my_first_bucket)

#Go from A - Z and store crap in the bucket
('a'..'z').each do |filename|
  S3Object.store(filename, 'Hello World', my_first_bucket)
end




#Create a new tool that will make files and copy them over
copy_util = CopyUtil.new()

#Print out the contents of the bucket
bucket = Bucket.find(my_first_bucket)
#Iterate through each item in the bucket and creat a json file
bucket.objects.each do |s3_obj|
  @key   = "#{s3_obj.key}" 
  @value = "#{s3_obj.value}"
  
  #Print this out on terminal
  puts @key + ":" + @value
  
  #Create a JSON file
  @json = JSONUtil.new.create(@key, @value)
  
  #Copy the contents of this bucket into files on the desktop
  copy_util.create_file(@key, @json)
end



#COpy over the entire directory
copy_util.copy_files


#Delete the bucket
#Bucket.delete("myFirstBucket",:force => true) # Delete your bucket and all its keys