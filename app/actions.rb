# Homepage (Root path)
get '/' do
  erb :index
end

# list
get '/contacts' do
  @contacts = (Contact.all).to_json
end

# new/create
post '/contacts' do
  @contact = Contact.new(
    firstname: params[:firstname],
    lastname: params[:lastname],
    email: params[:email],
    phone_number: params[:phone_number]
    )
  if @contact.save
    puts "inside save"
    @contact.to_json
  end
end

# show
get '/contacts/:id' do |id|
  @contact = Contact.find(id)
  puts @contact.to_json
  @contact.to_json
end

# update/edit

# destroy/delete
get '/contacts/:id/delete' do |id|
  results = {result: false}
  begin
    @contact = Contact.find(id)
    @contact_name = @contact.firstname
    @contact.destroy
    if @contact.destroy
      results[:result] = true
      results[:success_message] = "The user, #{@contact.firstname}, was deleted."
    else 
      results[:fail_message] = "Could not delete user. \"WTF?\""
    end
  rescue
    results[:fail_message] = "Whaaat? There's no user..."
  end
  results.to_json
end

