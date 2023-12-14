from type_chat import Sentiment

greeter = Sentiment()
content = greeter.get_file("input.txt")
for l in content:
    print(f"{l} ---> {greeter.get_response(l)}")
