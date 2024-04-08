function status(request, response) {
  //response.status(200).send("API com comportamento adequado");
  //.json já seta o charset utf8
  response.status(200).json({ chave: "API com configuração adequada" });
}

export default status;
