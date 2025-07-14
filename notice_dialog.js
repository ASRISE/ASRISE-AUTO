;(() => {
  // 创建样式
  const style = document.createElement('style')
  style.textContent = `
    .genspark-notice-dialog {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 10001;
      align-items: center;
      justify-content: center;
    }

    .genspark-notice-content {
      background-color: white;
      border-radius: 8px;
      max-width: 600px;
      width: 90%;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      font-size: 16px;
    }

    .genspark-notice-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .genspark-notice-list {
      margin: 16px 0;
      font-size: 14px;
    }

    .genspark-notice-list li {
      margin-bottom: 8px;
    }

    .genspark-notice-actions {
      text-align: center;
      margin-top: 20px;
    }

    .genspark-notice-ok {
      cursor: pointer;
      padding: 10px 20px;
      border: 1px solid #000;
      border-radius: 8px;
      background-color: #f0f0f0;
    }
  `
  document.head.appendChild(style)

  // 获取当前语言
  const getCurrentLocale = () => {
    // 优先检查全局变量 window.__genspark_locale
    if (window.__genspark_locale) {
      return window.__genspark_locale
    }

    // 回退到浏览器语言
    const browserLang = navigator.language || navigator.userLanguage
    // 简单映射到我们支持的语言
    const supportedLocales = [
      'en-US',
      'zh-CN',
      'zh-TW',
      'ja-JP',
      'ko-KR',
      'fr-FR',
      'de-DE',
      'es-ES',
      'it-IT',
      'pt-BR',
      'ru-RU',
      'hi-IN',
      'ar-EG',
    ]
    // 查找匹配的语言
    const matchedLocale = supportedLocales.find(locale =>
      browserLang.toLowerCase().startsWith(locale.toLowerCase().split('-')[0])
    )
    return matchedLocale || 'en-US' // 默认英语
  }

  // 获取本地化文本
  const getLocalizedText = () => {
    const locale = getCurrentLocale()

    const translations = {
      'en-US': {
        noticeTitle: 'This site was created by a user, please note:',
        noticePoint1:
          'Content may contain inaccuracies, double-check information before use.',
        noticePoint2:
          'If you notice any inappropriate content, contact support@genspark.ai.',
        okButton: 'OK',
      },
      'zh-CN': {
        noticeTitle: '此网站由用户创建，请注意：',
        noticePoint1: '内容可能包含不准确之处，使用前请仔细核实信息。',
        noticePoint2:
          '如果您发现此网站上有任何不适当的内容，请通过 support@genspark.ai 与我们联系。',
        okButton: '确定',
      },
      'zh-TW': {
        noticeTitle: '此網站由用戶創建，請注意：',
        noticePoint1: '內容可能包含不準確之處，使用前請仔細核實信息。',
        noticePoint2:
          '如果您發現此網站上有任何不適當的內容，請通過 support@genspark.ai 與我們聯繫。',
        okButton: '確定',
      },
      'ja-JP': {
        noticeTitle:
          'このサイトはユーザーによって作成されました、ご注意ください：',
        noticePoint1:
          'コンテンツには不正確な情報が含まれている可能性があります。使用前に情報を確認してください。',
        noticePoint2:
          '不適切なコンテンツを見つけた場合は、support@genspark.ai までご連絡ください。',
        okButton: 'OK',
      },
      'ko-KR': {
        noticeTitle: '이 사이트는 사용자가 만들었습니다. 참고하세요:',
        noticePoint1:
          '콘텐츠에 부정확한 정보가 포함될 수 있으니, 사용하기 전에 정보를 확인하세요.',
        noticePoint2:
          '부적절한 콘텐츠를 발견하시면 support@genspark.ai로 연락해 주세요.',
        okButton: '확인',
      },
      'fr-FR': {
        noticeTitle: 'Ce site a été créé par un utilisateur, veuillez noter :',
        noticePoint1:
          'Le contenu peut contenir des inexactitudes, vérifiez les informations avant utilisation.',
        noticePoint2:
          'Si vous remarquez un contenu inapproprié sur ce site, veuillez nous contacter à support@genspark.ai.',
        okButton: 'OK',
      },
      'de-DE': {
        noticeTitle:
          'Diese Seite wurde von einem Benutzer erstellt, bitte beachten Sie:',
        noticePoint1:
          'Inhalte können Ungenauigkeiten enthalten, überprüfen Sie Informationen vor der Verwendung.',
        noticePoint2:
          'Wenn Sie unangemessene Inhalte auf dieser Seite bemerken, kontaktieren Sie uns bitte unter support@genspark.ai.',
        okButton: 'OK',
      },
      'es-ES': {
        noticeTitle: 'Este sitio fue creado por un usuario, tenga en cuenta:',
        noticePoint1:
          'El contenido puede contener inexactitudes, verifique la información antes de usarla.',
        noticePoint2:
          'Si nota contenido inapropiado en este sitio, contáctenos en support@genspark.ai.',
        okButton: 'Aceptar',
      },
      'it-IT': {
        noticeTitle:
          'Questo sito è stato creato da un utente, si prega di notare:',
        noticePoint1:
          "Il contenuto potrebbe contenere inesattezze, verificare le informazioni prima dell'uso.",
        noticePoint2:
          "Se noti contenuti inappropriati su questo sito, contattaci all'indirizzo support@genspark.ai.",
        okButton: 'OK',
      },
      'pt-BR': {
        noticeTitle: 'Este site foi criado por um usuário, observe:',
        noticePoint1:
          'O conteúdo pode conter imprecisões, verifique as informações antes de usar.',
        noticePoint2:
          'Se você notar algum conteúdo inadequado neste site, entre em contato conosco em support@genspark.ai.',
        okButton: 'OK',
      },
      'ru-RU': {
        noticeTitle: 'Этот сайт создан пользователем, обратите внимание:',
        noticePoint1:
          'Контент может содержать неточности, проверяйте информацию перед использованием.',
        noticePoint2:
          'Если вы заметили неприемлемый контент на этом сайте, свяжитесь с нами по адресу support@genspark.ai.',
        okButton: 'ОК',
      },
      'hi-IN': {
        noticeTitle:
          'यह साइट एक उपयोगकर्ता द्वारा बनाई गई है, कृपया ध्यान दें:',
        noticePoint1:
          'सामग्री में अशुद्धियां हो सकती हैं, उपयोग करने से पहले जानकारी की जांच करें।',
        noticePoint2:
          'यदि आपको इस साइट पर कोई अनुचित सामग्री दिखाई देती है, तो कृपया हमसे support@genspark.ai पर संपर्क करें।',
        okButton: 'ठीक है',
      },
      'ar-EG': {
        noticeTitle: 'تم إنشاء هذا الموقع بواسطة مستخدم، يرجى ملاحظة:',
        noticePoint1:
          'قد يحتوي المحتوى على معلومات غير دقيقة، تحقق من المعلومات قبل الاستخدام.',
        noticePoint2:
          'إذا لاحظت أي محتوى غير لائق على هذا الموقع، فيرجى الاتصال بنا على support@genspark.ai.',
        okButton: 'موافق',
      },
    }

    return translations[locale] || translations['en-US']
  }

  const localizedText = getLocalizedText()

  // 检查是否显示通知对话框
  const shouldShowNotice = () => {
    // 获取当前域名
    const hostname = window.location.hostname

    // 检查域名是否符合要求
    const isGensparDomain =
      hostname.endsWith('.genspark.space') ||
      hostname.endsWith('.gensparkspace.com') ||
      hostname.endsWith('.i.coswift.ai')

    // 只有在指定域名下且localStorage中没有标记时才显示通知
    return (
      isGensparDomain &&
      localStorage.getItem('genspark-notice-hidden') !== 'true'
    )
  }

  // 创建通知对话框
  const createNoticeDialog = () => {
    const noticeDialog = document.createElement('div')
    noticeDialog.className = 'genspark-notice-dialog'
    noticeDialog.innerHTML = `
      <div class="genspark-notice-content">
        <h2 class="genspark-notice-title">${localizedText.noticeTitle}</h2>
        <ul class="genspark-notice-list">
          <li>${localizedText.noticePoint1}</li>
          <li>${localizedText.noticePoint2}</li>
        </ul>
        <div class="genspark-notice-actions">
          <button class="genspark-notice-ok">${localizedText.okButton}</button>
        </div>
      </div>
    `

    document.body.appendChild(noticeDialog)

    // 添加确认按钮事件
    const okButton = noticeDialog.querySelector('.genspark-notice-ok')

    okButton.addEventListener('click', () => {
      // 关闭对话框
      noticeDialog.remove()
    })
  }

  // 检查是否在iframe中
  const isInIframe = window.self !== window.top

  // 如果不在iframe中且应该显示通知，则显示通知
  if (!isInIframe && shouldShowNotice()) {
    // 延迟显示通知对话框，确保页面已完全加载
    setTimeout(() => {
      createNoticeDialog()
    }, 500)
  }
})()
