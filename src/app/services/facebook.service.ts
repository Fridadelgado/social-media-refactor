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
  private accessToken = 'EAAWs4fweUSQBO2vvKI66gRA6pr1FYYZCRlTgQNy4mrlZA9PoJ8PpdTWjScmcDzKiZA0naIkwv9HGVCs7ZAlBhYZBy8jAKZBKUW03UT4n1S5uEufP0Y8tyO2dySpxqEKEm84My9gC1WZAWnTDHMTsR0JhkbjA8lra7ZAyZATPCLYZA8NQ2vv5UnKZCwnXZBuBeztnXS0ZD';  // Use environment variables
  private pageId = '109266911433046';
  private apiUrl = 'https://graph.facebook.com/v19.0';

  constructor(private http: HttpClient) { }

  getKpis() {
    const metrics = [
      'page_impressions',
      'page_post_engagements',
      'page_fan_adds'
    ].join(',');
    const url = `${this.apiUrl}/${this.pageId}/insights?metric=${metrics}&access_token=${this.accessToken}`;
    return this.http.get(url).pipe(
      map((response: any) => this.transformFacebookData(response.data)),
      catchError(error => {
        console.error('Error fetching data from Facebook API', error);
        return throwError('Error fetching data from Facebook');
      })
    );
  }

  private transformFacebookData(data: any[]): SocialMediaKpi[] {
    if (!data) {
      throw new Error('No data available from Facebook API');
    }

    // Primero agrupa los datos por nombre y período para facilitar su acceso y transformación.
    const metricsMap = new Map<string, any>();

    data.forEach(item => {
      if (!metricsMap.has(item.name)) {
        metricsMap.set(item.name, {});
      }
      const periods = metricsMap.get(item.name);
      periods[item.period] = item.values;
    });

    // Ahora, transforma los datos agrupados en la estructura deseada.
    return Array.from(metricsMap, ([name, periods]) => ({
      socialMedia: 'facebook',
      KPIs: [{
        category: name,
        metrics: [{
          name: name,
          values: {
            days_28: this.extractValues(periods['days_28']),
            week: this.extractValues(periods['week']),
            day: this.extractValues(periods['day'])
          }
        }]
      }]
    }));
  }

  // Helper function to extract 'anterior' and 'actual' from an array of values
  private extractValues(values: any) {
    if (values.length >= 2) {
      // Assuming the array is ordered by 'end_time' ascending, so the last two are the most recent
      return {
        anterior: values[values.length - 2].value,
        actual: values[values.length - 1].value
      };
    } else if (values.length === 1) {
      return {
        anterior: values[0].value,
        actual: values[0].value
      };
    }
    return { anterior: 0, actual: 0 };
  }
}
