# Portal TI Verde — arquivos organizados

## Estrutura

```text
portal-ti-verde-organizado/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   └── style.css         # Aparência do site
│   └── js/
│       └── app.js            # Jogo, ranking e Supabase
├── database/
│   └── setup.sql             # Script de criação do banco
└── README.md                 # Instruções
```

## Publicar na Vercel

1. Envie `index.html`, a pasta `assets` e este `README.md` para a **raiz** do repositório GitHub. Não coloque a pasta inteira como subpasta do repositório.
2. **Não envie `database/setup.sql` para um repositório público se tiver colocado sua senha real nele.** Ele é apenas para configuração local.
3. Importe o repositório em https://vercel.com/new e publique como site estático, sem comando de build.
4. Abra o endereço publicado e teste o ranking e o controle de abertura da competição.

## Supabase

O JavaScript já contém a URL e a chave pública do projeto. O SQL foi executado anteriormente no Supabase, portanto **não é necessário executá-lo novamente**. O banco e os resultados existentes não são alterados ao reorganizar os arquivos.

A senha de organizador deve ficar somente no banco, nunca no HTML, JS ou GitHub. A chave pública do Supabase pode ser usada no navegador com permissões adequadas.

## Observações

O ranking é atualizado a cada 5 segundos. Cada equipe utiliza seu próprio celular. O cronômetro e as respostas são processados no navegador; para competições de maior escala, seria necessário endurecer os controles contra manipulação.
