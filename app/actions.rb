# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  @contacts = (Contact.all).to_json
end
