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

