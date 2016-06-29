# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  @contacts = (Contact.all).to_json
end

post '/contacts' do
  @contact = Contact.new(
    firstname: params[:firstname],
    lastname: params[:lastname],
    email: params[:email],
    phone_number: params[:phone_number]
    )
  if @contact.save
    puts @contact.to_json
    @contact.to_json
  end
end
