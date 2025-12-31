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
 * Server-side entry point for pre-rendering
 * This file is used during the build process to generate static HTML
 */
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";

export function render(url: string) {
  const helmetContext: any = {};

  return new Promise<{
    html: string;
    helmet: { title: string; meta: string; link: string; script: string };
  }>((resolve, reject) => {
    let html = "";

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
          const stream = new (require("stream").Writable)({
            write(chunk: any, _enc: any, cb: any) {
              html += chunk.toString();
              cb();
            },
          });

          stream.on("finish", () => {
            const { helmet } = helmetContext;

            resolve({
              html,
              helmet: {
                title: helmet?.title?.toString() || "",
                meta: helmet?.meta?.toString() || "",
                link: helmet?.link?.toString() || "",
                script: helmet?.script?.toString() || "",
              },
            });
          });

          pipe(stream);
        },
        onError(err) {
          reject(err);
        },
      }
    );

    // Safety: avoid hanging builds if something suspends forever
    setTimeout(() => abort(), 10000);
  });
}
