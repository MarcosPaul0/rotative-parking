# Front end de um sistema de estacionamento rotativo

## Pré-requisitos
- Nodejs
- Android Studio
- JDK 11
- [Backend](https://github.com/renanpiranguinho/smart-urban-parking-back-end)
- Expo cli (opcional)

## Instalando as dependências
Para doras a aplicação primeiramente é necessário instalar as dependências através do comando:
  
```
  npm install
```

## Executando a Aplicação no Emulador
Para executar a aplicação basta estar com o emulador Android executando e rodar o comando:
  
```
  npx expo start --android
```
  
Caso esteja com o Expo cli instalado, você poderá executar com o comando:
  
```
  expo start --android
```
  
Lembrando que esses emuladores consomem bastante recursos do seu computador. Por isso, se você possui um dispositivo físico Android e sua máquina tenha configurações modestas (ex.: ⬇ i3, ⬇ 4gb RAM), é recomendado executar a aplicação diretamente no dispositivo físico.

## Executando a Aplicação no Dispositivo Físico
Para executar em um dispositivo físico é necessário ter instalado o [Expo Go](https://apps.apple.com/us/app/expo-go/id982107779), para que seja possível acessar a plicação através da url ou lendo o qrcode.
Com isso, ao executar o comando abaixo, no terminal será exibido uma url e um qrcode que através do Expo Go é possível executar a aplicação, logo em seguida ele irá realizar o build e abrir o aplicativo.

```
  expo start
```
