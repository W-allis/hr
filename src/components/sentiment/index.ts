const ejs = require('ejs')
// const CompanyItem = require('./company-item.ejs')

export function CompanyItem(data: { companyList: any[] }) {
  return ejs.render(`<% companyList.forEach(function(item){ %>
    <div class="card">
      <div class="card-header" data-id="<%= item.company_id%>">
        <span class="wxp-company-name"><%= item.company_name%></span>
         
        <span>
        <% if (item.total > 0) { %>
        <span class="wxp-notice-circle"><%= item.total%></span> 
        <% } %>
        <i class="icon icon-right"></i></span>
      </div>
      <div class="card-content">
        <div class="card-content-inner">
          <div class="wxp-sentiment-list">
          <% (item.sentiment_list || []).forEach(function(child){ %>
            <div class="wxp-sentiment-item <%= child.read && 'wxp-readed'%>" data-url="<%= child.url%>" data-id="<%= child.id%>" data-read="<%= child.read%>">
              <div class="wxp-sentiment-title">
                <span class="wxp-<%= child.score >= -10 ? 'green' : 'yellow'%>-circle"></span><%= child.title%>
              </div>
              <div class="row no-gutter">
                <div class="col-50">
                  <div class="link wxp-sentiment-source"><%= child.source%></div>
                </div>
                <div class="col-50">
                  <div class="link wxp-sentiment-date"><%= child.date%></div>
                </div>
              </div>
            </div>
            <% }); %>
          </div>
        </div>
      </div>
    </div>
  <% }); %>`, data)
}

export function SentimentItem(data: { sentimentList: any[] }) {
  return ejs.render(`<% sentimentList.forEach(function(item, index){ %>
      <div class="card wxp-sentiment-item <%= item.read && 'wxp-readed'%>" data-url="<%= item.target_url%>" data-read="<%= item.read%>" data-id="<%= item.id%>" >
        <div class="card-content">
          <div class="card-content-inner">
            <span class="wxp-sentiment-title">
              <span class="wxp-<%= item.score >= -10 ? 'green' : 'yellow'%>-circle"></span>
              <%= item.title%>
            </span>
          </div>
        </div>
        
        <div class="wxp-card-footer">
          <div class="row no-gutter">
            <div class="col-50">
              <div class="link wxp-sentiment-source"><%= item.source%></div>
            </div>
            <div class="col-50">
              <div class="link wxp-sentiment-date"><%= item.date%></div>
            </div>
          </div>
        </div>
      </div>
  <% }); %>`, data)
}


