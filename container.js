function trySetEditorConfig() {
    const iframeWindow = document.getElementById('editorFrame').contentWindow;
    
    try {
        if (typeof iframeWindow.setEditorConfig === 'function') {
            iframeWindow.eval("setEditorConfig({});");
        } else {
     
            setTimeout(trySetEditorConfig, 100);
        }
    } catch (e) {
        setTimeout(trySetEditorConfig, 100);
    }
    console.log(iframeWindow)
}

trySetEditorConfig()