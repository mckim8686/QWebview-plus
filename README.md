# QWebview-plus
 - 키움 오픈 API+ for JavaScript를 지원하는 WebView

## Development Environment
 - Windows 32bit
 - 키움증권 Open API+ (https://www1.kiwoom.com/nkw.templateFrameSet.do?m=m1408000000)
 - Anaconda 32bit 2.4.0 (http://continuum.io/downloads)

 
## 키움 Open API+를 제공하는 kiwoom 객체 제공
 
### window.kiwoom 
 - [키움 오픈 API](https://download.kiwoom.com/web/openapi/kiwoom_openapi_plus_devguide_ver_1.1.pdf)와 동일한 메소드를 제공
 - 키움 오픈 API와 네이밍 규칙이 다름 
    - 첫 문자가 대문자 아닌 소문자
      ```
      예) CommConnect => commConnect
      ```

### 이벤트
 - [키움 오픈 API](https://download.kiwoom.com/web/openapi/kiwoom_openapi_plus_devguide_ver_1.1.pdf)와 동일한 이벤트를 제공
 - 모든 이벤트는 `document`에서 발생한다.
 - 키움 오픈 API와 네이밍 규칙이 다름 
    - `kiwoom` 이라는 event namespace가 붙음
    - 이벤트 명에서 `on`이라는 prefix가 제거하고, 첫 문자를 소문자로 변경
      ```
      예) OnReceiveTrData => receiveTrData.kiwoom
      ```
    - 이벤트에 의해 전달되는 속성은 detail에 포함되어 전달됨
    - 이벤트에 전달되는 속성명은 타입약어가 제거되고, 첫 문자를 소문자로 변경
      ```
      예) sScrNo => scrNo
      ```

## 사용 예
```bash
npm start # development mode
gulp run # production mode?
```

> 실행할 파일을 입력하지 않을 경우, 기본적으로 index.html을 부른다.
