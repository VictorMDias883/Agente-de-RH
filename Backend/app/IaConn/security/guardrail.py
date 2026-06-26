Paterns = [
    "ignore previous instructions",
    "ignore all instructions",
    "ignore the instructions",
    "disregard previous instructions",
    "disregard all instructions",
    "system prompt",
    "reveal your prompt",
    "show your instructions",
    "act as another assistant",
    "act as if you are",
    "developer message",
    "prompt interno",
    "ignore o sistema",
    "ignore o prompt",
    "ignora as instruções",
    "ignora instruções",
    "revele seu prompt",
    "mostre suas instruções",
    "você é um modelo",
    "você é um assistente",
    "forget the previous instructions",
    "forget all instructions",
    "override the system",
    "override the rules",
    "bypass the safety",
    "bypass the rules",
    "ignore safety",
    "ignore the rules",
    "ignore the system",
    "pretend to be",
    "roleplay as",
    "you are now",
    "from now on",
    "new instructions",
    "instruções secretas",
    "prompt secreto",
    "mensagem do desenvolvedor",
    "ignore my previous message"
]


def messsageDetection(message: str):
    message = message.lower()

    return any(
        pattern in message for pattern in Paterns
    )