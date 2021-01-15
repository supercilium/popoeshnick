from telegram.ext import Updater, CommandHandler,  MessageHandler, Filters
import logging
from popo import app

TOKEN = app.config["BOT_TOKEN"]

updater = Updater(token=TOKEN, use_context=True)
dispatcher = updater.dispatcher

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

def start(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text="I'm a bot, please talk to me!") 


start_handler = CommandHandler('start', start)
dispatcher.add_handler(start_handler)

def echo(update, context):
    upd = f'Your chat ID is {update.effective_chat.id}, your username is {update.message.chat.username}, you wrote: {update.message.text}'
    context.bot.send_message(chat_id=update.effective_chat.id, text=upd)


echo_handler = MessageHandler(Filters.text & (~Filters.command), echo)
dispatcher.add_handler(echo_handler)


updater.start_polling()