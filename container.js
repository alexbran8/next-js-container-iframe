function trySetEditorConfig() {

    const iframeWindow = document.getElementById('editorFrame').contentWindow;

    try {
        if (typeof iframeWindow.setEditorConfig === 'function') {
            iframeWindow.eval("setEditorConfig({\"strikethrough\":false,\"dateParsing\":'showButton',\"scrollToBottomButtonVisibility\":\"visibleWhileEditorUnfocused\",\"placeholder\":\"\",\"styling\":{\"editorContainer\":{\"topPadding\":16,\"leadingPadding\":12,\"bottomPadding\":16,\"trailingPadding\":12},\"title\":{\"lineHeight\":24,\"fontSize\":22},\"orderedList\":{\"numberFontSize\":17},\"tasksList\":{\"checkMarkTopPadding\":0},\"inlineTag\":{\"fontSize\":16},\"body\":{\"lineHeight\":24,\"fontSize\":17},\"heading\":{\"lineHeight\":21,\"fontSize\":19},\"code\":{\"fontSize\":16}},\"allowEditing\":true,\"emitReturnKeypressEvent\":false,\"showInlineTags\":true,\"allowToggleKeyboard\":true,\"hideDragHandles\":true,\"toolbar\":{\"position\":\"hidden\",\"collapsed\":false,\"hideWhenNotEditing\":false},\"hideBubbleMenu\":true,\"debounceInSeconds\":0.5});");
            console.log("Editor configuration loaded");
            iframeWindow.editor.commands.setContent(`
                <p>
                  This is a rich content editor. You can add:
                  <a href="https://example.com" target="_blank">links</a>,
                  <a href="https://openaipolicies.com" target="_blank">AI Policies</a>,
                  <a href="https://news.example.com" target="_blank">latest news</a>,
                  <a href="https://techupdates.com" target="_blank">tech updates</a>,
                  <a href="https://travelblog.com" target="_blank">travel blogs</a>,
                  <a href="https://movies.example.com" target="_blank">movie reviews</a>,
                  <a href="https://recipehub.com" target="_blank">recipes</a>,
                  <span class="mention">@JaneDoe</span>,
                  <span class="mention">@TechGuru</span>,
                  <span class="mention">@Foodie123</span>,
                  <span class="tag">#Trending</span>,
                  <span class="tag">#Technology</span>,
                  <span class="tag">#Lifestyle</span>,
                  <span class="tag">#HealthTips</span>,
                  and dates like <span class="date">2024-11-21</span>,
                  <span class="date">2023-10-15</span>,
                  <span class="date">2025-01-01</span>,
                  <span class="date">2024-12-25</span>,
                  <span class="date">2026-07-04</span>,
                  <span class="date">2024-04-10</span>,
                  <span class="date">2023-05-20</span>,
                  and <span class="date">2027-09-09</span>.
                </p>
                <p>
                  Here are some more examples: 
                  <a href="https://books.example.com" target="_blank">book reviews</a>,
                  <a href="https://gardeninghub.com" target="_blank">gardening tips</a>,
                  <a href="https://music.example.com" target="_blank">music trends</a>,
                  <a href="https://fitness.example.com" target="_blank">fitness routines</a>,
                  <a href="https://sportsnews.com" target="_blank">sports updates</a>,
                  <a href="https://historyblog.com" target="_blank">historical insights</a>,
                  <span class="mention">@HistoryBuff</span>,
                  <span class="mention">@SportsFan</span>,
                  <span class="tag">#Fitness</span>,
                  <span class="tag">#Music</span>,
                  <span class="tag">#Books</span>,
                  and dates like <span class="date">2024-03-14</span>,
                  <span class="date">2024-08-30</span>,
                  <span class="date">2025-06-15</span>,
                  <span class="date">2024-02-28</span>.
                </p>
                <p>
                  Start typing here to add more content...
                </p>
                `);                
            console.log('Editor content loaded');
            listen();
        } else {
     
            setTimeout(trySetEditorConfig, 100);
        }
    } catch (e) {
        setTimeout(trySetEditorConfig, 100);
    }
}
document.getElementById('editorFrame').onload = function() {
    console.log("Editor iframe loaded");
    const iframeWindow = document.getElementById('editorFrame').contentWindow;
    iframeWindow.webkit = {
        messageHandlers: messageHandlers()
      }
}; 

function messageHandlers() {
    if (typeof window === 'undefined') return null
  
    return {
        editorEvent: {
          postMessage: (message) => {
            if (message == "requestConfig") {
                trySetEditorConfig();
            }
          }
        },
        contentChange: {
          postMessage: (message) => {
            console.log(message)
          }
        },
        linkEvent: {
          postMessage: (message) => {
            console.log('event', message.event, 'url', message.url)
          }
        },
        scheduleParsedDate: {
          postMessage: (message) => {
            console.log('date', message.date, 'matchedString', message.matchedString)
          }
        },
        taggingEvent: {
          postMessage: (message) => {}
        },
        keypressEvent: {
          postMessage: (message) => {}
        },
        activeContentStyling: {
          postMessage: (message) => {}
        }
    }
  }
  
  function listen() {
    console.log('listening to messages sent from postMessage({})')
    window.onmessage = (event) => {
        console.log(`Received message: ${JSON.stringify(event.data)}`);
      }; 
}
