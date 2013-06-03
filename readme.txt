
Para executar este projeto, faça:

1. Baixe este repositorio (imagino que já o tenha feito, dado que está lendo
este doc)

2. Baixe o solr da sua pagina oficial ( http://lucene.apache.org/solr/ ) -
ultima versão

3. Extraia o solr em qualquer lugar

4. Copie os arquivos que estão na pasta chamada solr, neste repositorio para
<lugar que vc extraiu o solr>/example/solr/collection1/conf - a maioria dos
arquivos serão sobrescritos

5. Inicie o solr a partir da pstar <lugar que vc extraiu o solr>/example/
executando o comando "java -jar start.jar"

6. Execute o cherrypy (aplicação web) a partir da pasta raiz do repo
executando "python serve.py"

7. A porta default é 8000. Pode ser modificada nas configs do cherrypy.

8. Para subir arquivo basta acessar localhost:8000/newarticle.html

9. Para ver o que o Thomas tá fazendo: localhost:8000/

10. Para fazer uma busca e ter uma resposta json:
localhost::8000/search?q=<query especificada pelo solr - pode ser um texto
apenas, para a busca simples>&fl=<atributos a serem retornados, nao obrigatorio>
