import { Observable } from 'rxjs';
export function loadScript(id: string, url: string): Observable<boolean> {
  return new Observable<boolean>(subscribe => {
    let script = <HTMLScriptElement>document.getElementById(id);
    if (script) {
      subscribe.next(false);
      subscribe.complete();
    } else {
      script = document.createElement('script');
      document.body.appendChild(script);
      script.onload = () => {
        subscribe.next(true);
        subscribe.complete();
      };
      script.onerror = (ev: ErrorEvent) => subscribe.error(ev.error);
      script.id = id;
      script.async = true;
      script.src = url;
    }
  });
}
