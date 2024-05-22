import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface KpiValue {
  anterior: number;
  actual: number;
}

interface KpiMetric {
  name: string;
  values: {
    days_28: KpiValue;
    week: KpiValue;
    day: KpiValue;
  };
}

interface KpiCategory {
  category: string;
  metrics: KpiMetric[];
}

interface SocialMediaKpi {
  socialMedia: string;
  KPIs: KpiCategory[];
}

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  private lambdaUrl = 'https://5zzwcn4zvk.execute-api.us-west-1.amazonaws.com/dev/facebook';  // URL de tu función Lambda

  constructor(private http: HttpClient) { }

  getKpis() {
    return this.http.get(this.lambdaUrl).pipe(
      map((response: any) => {
        // Extraer el campo `body` que contiene los datos reales
        const kpisData: SocialMediaKpi[] = response.body;
        return kpisData;
      }),
      catchError(error => {
        console.error('Error fetching data from Lambda function', error);
        return throwError('Error fetching data from Lambda function');
      })
    );
  }
}
