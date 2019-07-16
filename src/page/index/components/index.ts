const ejs = require('ejs')
// const CompanyItem = require('./company-item.ejs')

export function CompanyItem(data: { companyList: any[] }) {
  return ejs.render(`<% companyList.forEach(function(item){ %>
    <div class="col-33">
      <div class="wxp-company-item" data-company="<%= item.name%>">
        <div class="wxp-company-icon">
          <img src="<%= item.url%>" alt="" srcset="">
        </div>
        <span><%= item.name%></span> 
      </div>
    </div>
  <% }); %>`, data)
}

export function SentimentItem(data: { sentimentList: any[] }) {
  return ejs.render(`<% sentimentList.forEach(function(item, index){ %>
    <a href="<%= item.target_url%>">
      <div class="card wxp-sentiment-item">
        <div class="card-content">
          <div class="card-content-inner">
            <p class="wxp-sentiment-title"><%= index + 1%>. &nbsp;<%= item.title%></p>
          </div>
        </div>
        
        <div class="wxp-card-footer">
          <a href="javascript: void(0)" class="link"><%= item.source%></a>
          <a href="javascript: void(0)" class="link"><%= item.date%></a>
        </div>
      </div>
    </a>
  <% }); %>`, data)
}


