from transformers import BlenderbotForConditionalGeneration, BlenderbotTokenizer


class BlenderBot(object):
    def __init__(self):
        name = "facebook/blenderbot-400M-distill"
        self.model = BlenderbotForConditionalGeneration.from_pretrained(name)
        self.tokenizer = BlenderbotTokenizer.from_pretrained(name)
        self.history = ""

    def send(self, message: str, *args, **kwargs):
        self.history = self.history + message

        try:
            inputs = self.tokenizer([self.history], return_tensors="pt")
            reply_ids = self.model.generate(**inputs)
        except:
            self.history = message
            inputs = self.tokenizer([self.history], return_tensors="pt")
            reply_ids = self.model.generate(**inputs)

        reply_str = self.tokenizer.batch_decode(reply_ids, skip_special_tokens=True)[0]
        self.history += "</s> <s>" + reply_str
        return reply_str
