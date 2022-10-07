from transformers import AutoTokenizer, AutoModelWithLMHead
import torch


class AeonaBot(object):
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("deepparag/Aeona")
        self.model = AutoModelWithLMHead.from_pretrained("deepparag/Aeona")
        self.chat_history_ids = None

    def send(self, message: str, *args, **kwargs):
        new_user_input_ids = self.tokenizer.encode(message + self.tokenizer.eos_token, return_tensors='pt')

        bot_input_ids = torch.cat([self.chat_history_ids, new_user_input_ids],
                                  dim=-1) if self.chat_history_ids is not None else new_user_input_ids

        chat_history_ids = self.model.generate(
            bot_input_ids, max_length=200,
            pad_token_id=self.tokenizer.eos_token_id,
            no_repeat_ngram_size=4,
            do_sample=True,
            top_k=100,
            top_p=0.7,
            temperature=0.8
        )

        response = self.tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)
        return response
