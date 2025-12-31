// /**
//  * Server-side entry point for pre-rendering
//  * This file is used during the build process to generate static HTML
//  */
// import React from "react";
// import { renderToString } from "react-dom/server";
// import { StaticRouter } from "react-router-dom/server";
// import { HelmetProvider } from "react-helmet-async";
// import App from "./App";
// import { ErrorBoundary } from "./components/ErrorBoundary";

// export function render(url: string) {
//   const helmetContext = {};
  
//   const html = renderToString(
   
//       <HelmetProvider context={helmetContext}>
//         <StaticRouter location={url}>
//           <ErrorBoundary>
//             <App />
//           </ErrorBoundary>
//         </StaticRouter>
//       </HelmetProvider>
    
//   );

//   // Extract helmet data
//   const { helmet } = helmetContext as any;

//   return {
//     html,
//     helmet: {
//       title: helmet?.title?.toString() || "",
//       meta: helmet?.meta?.toString() || "",
//       link: helmet?.link?.toString() || "",
//       script: helmet?.script?.toString() || "",
//     }
//   };
// }


/**
 * Server-side entry point for pre-rendering (ESM + streaming)
 */
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Writable } from "node:stream";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";

export function render(url: string) {
  const helmetContext: any = {};

  return new Promise<{
    html: string;
    helmet: { title: string; meta: string; link: string; script: string };
  }>((resolve, reject) => {
    let html = "";
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() {
          const writable = new Writable({
            write(chunk, _enc, cb) {
              html += chunk.toString();
              cb();
            },
          });

          writable.on("finish", () => {
            const helmet = helmetContext?.helmet;

            resolve({
              html,
              helmet: {
                title: helmet?.title?.toString?.() ?? "",
                meta: helmet?.meta?.toString?.() ?? "",
                link: helmet?.link?.toString?.() ?? "",
                script: helmet?.script?.toString?.() ?? "",
              },
            });
          });

          writable.on("error", (err) => reject(err));

          pipe(writable);
        },

        onShellError(err) {
          reject(err);
        },

        onError(err) {
          didError = true;
          // keep logging but don’t crash immediately; prerender can still complete
          console.error(err);
        },
      }
    );

    setTimeout(() => abort(), 10_000);
  });
}
